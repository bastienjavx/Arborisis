import json
import os
import subprocess
from typing import Any

from app.config import settings
from app.core.logger import get_logger
from app.services.r2_storage import R2Storage

logger = get_logger(__name__)

MIN_DURATION_FOR_BIRDNET = 3.0


class BirdnetRunner:
    def __init__(self, storage: R2Storage) -> None:
        self.storage = storage

    def analyze_and_upload(self, local_path: str, sound_id: int, duration: float, usable: bool) -> tuple[str | None, list[dict[str, Any]]]:
        if duration < MIN_DURATION_FOR_BIRDNET or not usable:
            logger.info("birdnet_skipped", sound_id=sound_id, duration=duration, usable=usable)
            return None, []

        result_csv = local_path.replace(os.path.splitext(local_path)[1], "_birdnet.csv")

        cmd = [
            "python3", "-m", "birdnet_analyzer.analyze",
            "--i", local_path,
            "--o", result_csv,
            "--min_conf", str(settings.birdnet_confidence_threshold),
        ]

        try:
            subprocess.run(cmd, capture_output=True, text=True, check=True, timeout=300)
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            logger.error("birdnet_failed", sound_id=sound_id, error=str(e))
            return None, []

        detections = self._parse_csv(result_csv)

        if os.path.exists(result_csv):
            os.remove(result_csv)

        birdnet_data = {
            "model": "BirdNET Analyzer",
            "detections": detections,
        }

        temp_json = local_path.replace(os.path.splitext(local_path)[1], "_birdnet.json")
        with open(temp_json, "w") as f:
            json.dump(birdnet_data, f, indent=2)

        r2_key = f"sounds/analysis/{sound_id}/birdnet.json"
        self.storage.upload(temp_json, r2_key, content_type="application/json")
        os.remove(temp_json)

        logger.info("birdnet_completed", sound_id=sound_id, r2_key=r2_key, detections=len(detections))
        return r2_key, detections

    def _parse_csv(self, csv_path: str) -> list[dict[str, Any]]:
        if not os.path.exists(csv_path):
            return []

        detections = []
        with open(csv_path, "r") as f:
            lines = f.readlines()

        if len(lines) < 2:
            return []

        # Header: Start (s),End (s),Scientific name,Common name,Confidence
        for line in lines[1:]:
            line = line.strip()
            if not line:
                continue
            parts = line.split(",")
            if len(parts) < 5:
                continue
            try:
                detections.append({
                    "scientific_name": parts[2].strip(),
                    "common_name": parts[3].strip(),
                    "confidence": round(float(parts[4].strip()), 3),
                    "start_time": round(float(parts[0].strip()), 2),
                    "end_time": round(float(parts[1].strip()), 2),
                })
            except (ValueError, IndexError):
                continue

        return detections
