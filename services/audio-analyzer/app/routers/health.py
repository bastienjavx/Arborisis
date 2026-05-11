import shutil
import subprocess

from fastapi import APIRouter

from app.core.logger import get_logger
from app.models.responses import HealthResponse

router = APIRouter()
logger = get_logger(__name__)


def _command_exists(cmd: str) -> bool:
    return shutil.which(cmd) is not None


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    ffmpeg_ok = _command_exists("ffmpeg")
    try:
        import librosa
        librosa_ok = True
    except ImportError:
        librosa_ok = False

    birdnet_ok = False
    try:
        result = subprocess.run(
            ["python3", "-m", "birdnet_analyzer.analyze", "--help"],
            capture_output=True,
            timeout=5,
        )
        birdnet_ok = result.returncode == 0
    except Exception:
        pass

    return HealthResponse(
        status="ok",
        birdnet_available=birdnet_ok,
        ffmpeg_available=ffmpeg_ok,
        librosa_available=librosa_ok,
    )
