import json
import os
from typing import Any

import librosa
import numpy as np

from app.core.logger import get_logger
from app.services.r2_storage import R2Storage

logger = get_logger(__name__)


class FeatureExtractor:
    def __init__(self, storage: R2Storage) -> None:
        self.storage = storage

    def extract_and_upload(self, local_path: str, sound_id: int, metadata: dict[str, Any]) -> tuple[dict[str, Any], str]:
        y, sr = librosa.load(local_path, sr=None, mono=True)
        duration = metadata.get("duration_seconds", librosa.get_duration(y=y, sr=sr))

        # Temporal features
        rms = librosa.feature.rms(y=y)[0]
        zcr = librosa.feature.zero_crossing_rate(y=y)[0]

        # Spectral features
        spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
        spectral_rolloffs = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]

        # Dominant frequencies (top 3 peaks from mean spectrum)
        spec = np.abs(np.fft.rfft(y))
        freqs = np.fft.rfftfreq(len(y), 1 / sr)
        peak_indices = np.argsort(spec)[-3:][::-1]
        dominant_frequencies = [int(freqs[i]) for i in peak_indices if freqs[i] > 0]

        # Peak / RMS / Noise floor (dB)
        peak = float(np.max(np.abs(y)))
        peak_db = round(20 * np.log10(peak + 1e-10), 2) if peak > 0 else -120.0
        rms_mean = float(np.mean(rms))
        rms_db = round(20 * np.log10(rms_mean + 1e-10), 2) if rms_mean > 0 else -120.0

        # Noise floor : percentile 10 of RMS frames
        noise_floor = float(np.percentile(rms, 10))
        noise_floor_db = round(20 * np.log10(noise_floor + 1e-10), 2) if noise_floor > 0 else -120.0

        # Loudness approx (ITU-R BS.1770 simple approximation via integrated loudness from RMS)
        loudness_lufs = round(rms_db - 14.0, 2)  # rough approximation

        features = {
            "duration_seconds": round(duration, 2),
            "sample_rate": metadata.get("sample_rate", sr),
            "channels": metadata.get("channels", 1),
            "format": metadata.get("format", ""),
            "bitrate": metadata.get("bitrate"),
            "loudness_lufs": loudness_lufs,
            "peak_db": peak_db,
            "rms_db": rms_db,
            "noise_floor_db": noise_floor_db,
            "spectral_centroid": round(float(np.mean(spectral_centroids)), 2),
            "spectral_rolloff": round(float(np.mean(spectral_rolloffs)), 2),
            "zero_crossing_rate": round(float(np.mean(zcr)), 4),
            "dominant_frequencies": dominant_frequencies,
        }

        temp_json = local_path.replace(os.path.splitext(local_path)[1], "_features.json")
        with open(temp_json, "w") as f:
            json.dump(features, f, indent=2)

        r2_key = f"sounds/analysis/{sound_id}/features.json"
        self.storage.upload(temp_json, r2_key, content_type="application/json")
        os.remove(temp_json)

        logger.info("features_extracted", sound_id=sound_id, r2_key=r2_key, duration=features["duration_seconds"])
        return features, r2_key
