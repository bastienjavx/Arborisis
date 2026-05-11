import json
import os
from typing import Any

from app.core.logger import get_logger
from app.services.r2_storage import R2Storage

logger = get_logger(__name__)

TAG_MAP = {
    "bird": ["Aves", "Passeriformes", "Turdus", "Parus", "Troglodytes"],
    "insect": ["Orthoptera", "Cicadidae", "Gryllidae"],
    "mammal": ["Mammalia", "Chiroptera"],
    "water": ["water", "stream", "river", "lake", "pond"],
    "forest": ["forest", "wood", "tree"],
    "morning": ["dawn", "morning"],
    "night": ["night", "nocturnal"],
}


class SummaryBuilder:
    def __init__(self, storage: R2Storage) -> None:
        self.storage = storage

    def build_and_upload(
        self,
        sound_id: int,
        duration: float,
        detections: list[dict[str, Any]],
        quality: dict[str, Any],
        features: dict[str, Any],
    ) -> str:
        main_species = [
            {"name": d["common_name"], "confidence": d["confidence"]}
            for d in sorted(detections, key=lambda x: x["confidence"], reverse=True)[:5]
        ]

        suggested_tags = self._suggest_tags(detections, features)

        summary = {
            "sound_id": sound_id,
            "duration_seconds": round(duration, 2),
            "main_detected_species": main_species,
            "suggested_tags": suggested_tags,
            "quality": {
                "noise_level": self._noise_level_label(quality.get("noise_floor_db", -60)),
                "clipping_detected": quality.get("clipping_detected", False),
                "usable_for_analysis": quality.get("usable_for_analysis", True),
            },
        }

        temp_json = f"/tmp/analyzer/{sound_id}_summary.json"
        os.makedirs(os.path.dirname(temp_json), exist_ok=True)
        with open(temp_json, "w") as f:
            json.dump(summary, f, indent=2)

        r2_key = f"sounds/analysis/{sound_id}/summary.json"
        self.storage.upload(temp_json, r2_key, content_type="application/json")
        os.remove(temp_json)

        logger.info("summary_built", sound_id=sound_id, r2_key=r2_key)
        return r2_key

    def _suggest_tags(self, detections: list[dict[str, Any]], features: dict[str, Any]) -> list[str]:
        tags = set()
        for d in detections:
            sci = d.get("scientific_name", "").lower()
            com = d.get("common_name", "").lower()
            for tag, keywords in TAG_MAP.items():
                if any(kw.lower() in sci or kw.lower() in com for kw in keywords):
                    tags.add(tag)

        if not tags:
            tags.add("nature")

        # Heuristic frequency-based tags
        centroid = features.get("spectral_centroid", 3000)
        if centroid > 8000:
            tags.add("high-frequency")
        elif centroid < 1000:
            tags.add("low-frequency")

        return sorted(list(tags))

    def _noise_level_label(self, noise_floor_db: float) -> str:
        if noise_floor_db > -30:
            return "high"
        if noise_floor_db > -45:
            return "medium"
        return "low"
