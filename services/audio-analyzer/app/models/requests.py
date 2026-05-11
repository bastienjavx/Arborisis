from pydantic import BaseModel, Field, field_validator


class AnalyzeRequest(BaseModel):
    sound_id: int = Field(..., gt=0)
    original_r2_key: str = Field(..., min_length=1, max_length=512)
    force: bool = False

    @field_validator("original_r2_key")
    @classmethod
    def validate_r2_key(cls, v: str) -> str:
        normalized = v.replace("\\", "/")
        if ".." in normalized or not normalized.startswith("sounds/original/"):
            raise ValueError("Invalid R2 key.")
        parts = normalized.split("/")
        if len(parts) < 4:
            raise ValueError("Invalid R2 key structure.")
        return normalized
