import asyncio
from typing import Any

import httpx

from app.config import settings
from app.core.logger import get_logger

logger = get_logger(__name__)

BACKOFF_DELAYS = [2, 5, 10]


class LaravelCallback:
    async def send(self, payload: dict[str, Any]) -> None:
        if not settings.laravel_api_url or not settings.laravel_api_secret:
            logger.warning("laravel_callback_not_configured")
            return

        url = f"{settings.laravel_api_url}/api/internal/audio-analysis/callback"
        headers = {
            "Authorization": f"Bearer {settings.laravel_api_secret}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        }

        for attempt, delay in enumerate(BACKOFF_DELAYS, start=1):
            try:
                async with httpx.AsyncClient(timeout=30.0) as client:
                    response = await client.post(url, json=payload, headers=headers)

                if response.status_code < 500:
                    logger.info("laravel_callback_sent", attempt=attempt, status=response.status_code)
                    return

                logger.warning(
                    "laravel_callback_retry",
                    attempt=attempt,
                    status=response.status_code,
                    delay=delay,
                )
            except Exception as e:
                logger.error("laravel_callback_error", attempt=attempt, error=str(e))

            if attempt < len(BACKOFF_DELAYS) + 1:
                await asyncio.sleep(delay)

        logger.error("laravel_callback_failed_after_retries")
