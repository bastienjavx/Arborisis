# =============================================================================
# Arborisis — Python Audio Analysis Service
# =============================================================================

FROM python:3.11-slim-bookworm

WORKDIR /app

# Dépendances système (ffmpeg pour l'audio)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ffmpeg \
        libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# Dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Code source
COPY . .

# Utilisateur non-root
RUN useradd -m -u 1000 arborisis \
    && chown -R arborisis:arborisis /app
USER arborisis

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import sys; sys.exit(0)" || exit 1

EXPOSE 8000

CMD ["python", "-m", "http.server", "8000"]
