#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOCKER_DIR="$REPO_ROOT/infrastructure/docker"
APP_DIR="$REPO_ROOT/arborisis"

echo "🌿 Arborisis — Setup développement local"

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Installe-le d'abord : https://docs.docker.com/get-docker/"
    exit 1
fi

COMPOSE_CMD="docker compose"
if ! docker compose version &> /dev/null 2>&1; then
    if docker-compose version &> /dev/null 2>&1; then
        COMPOSE_CMD="docker-compose"
    else
        echo "❌ Docker Compose n'est pas installé. Installe-le d'abord."
        exit 1
    fi
fi

# Configurer l'env Docker
cd "$DOCKER_DIR"
if [ ! -f .env ]; then
    echo "📄 Création de infrastructure/docker/.env"
    cp .env.example .env
fi

# Configurer l'env Laravel
cd "$APP_DIR"
if [ ! -f .env ]; then
    echo "📄 Création de arborisis/.env"
    cp .env.example .env

    # Adapter pour Docker (portable macOS/Linux)
    perl -pi -e 's/^APP_ENV=.*/APP_ENV=local/' .env
    perl -pi -e 's/^APP_DEBUG=.*/APP_DEBUG=true/' .env
    perl -pi -e 's/^APP_URL=.*/APP_URL=http:\/\/localhost/' .env
    perl -pi -e 's/^DB_CONNECTION=.*/DB_CONNECTION=pgsql/' .env
    perl -pi -e 's/^#?\s*DB_HOST=.*/DB_HOST=postgres/' .env
    perl -pi -e 's/^#?\s*DB_PORT=.*/DB_PORT=5432/' .env
    perl -pi -e 's/^#?\s*DB_DATABASE=.*/DB_DATABASE=arborisis/' .env
    perl -pi -e 's/^#?\s*DB_USERNAME=.*/DB_USERNAME=arborisis/' .env
    perl -pi -e 's/^#?\s*DB_PASSWORD=.*/DB_PASSWORD=change-me/' .env
    perl -pi -e 's/^CACHE_STORE=.*/CACHE_STORE=redis/' .env
    perl -pi -e 's/^SESSION_DRIVER=.*/SESSION_DRIVER=redis/' .env
    perl -pi -e 's/^QUEUE_CONNECTION=.*/QUEUE_CONNECTION=redis/' .env
    perl -pi -e 's/^REDIS_HOST=.*/REDIS_HOST=redis/' .env
    perl -pi -e 's/^BROADCAST_CONNECTION=.*/BROADCAST_CONNECTION=reverb/' .env
    perl -pi -e 's/^FILESYSTEM_DISK=.*/FILESYSTEM_DISK=local/' .env

    # Générer APP_KEY avec PHP
    echo "🔑 Génération de APP_KEY..."
    APP_KEY=$(docker run --rm -v "$APP_DIR":/app -w /app php:8.4-cli php -r "echo 'base64:' . base64_encode(random_bytes(32));" 2>/dev/null)
    if [ -n "$APP_KEY" ]; then
        perl -pi -e "s/^APP_KEY=.*/APP_KEY=$APP_KEY/" .env
    else
        echo "⚠️  Impossible de générer APP_KEY automatiquement. Lance manuellement :"
        echo "   cd $APP_DIR && php artisan key:generate"
    fi
fi

# Build et lancer
cd "$DOCKER_DIR"
echo "🐳 Build des images..."
$COMPOSE_CMD --profile data --profile web --profile workers build

echo "🚀 Démarrage des services data (PostgreSQL + Redis)..."
$COMPOSE_CMD --profile data up -d

echo "⏳ Attente de PostgreSQL..."
for i in {1..30}; do
    if $COMPOSE_CMD exec -T postgres pg_isready -U arborisis -d arborisis &>/dev/null; then
        echo "✅ PostgreSQL est prêt"
        break
    fi
    sleep 1
done

echo "🚀 Démarrage des services web + workers..."
$COMPOSE_CMD --profile web --profile workers up -d

echo "⏳ Attente que l'app soit prête..."
sleep 5

echo "🗄️  Migrations..."
$COMPOSE_CMD exec -T app php artisan migrate --force || true

echo "🔗 Liens storage..."
$COMPOSE_CMD exec -T app php artisan storage:link || true

echo ""
echo "✅ Arborisis est lancé en mode développement !"
echo ""
echo "🌐 Application    : http://localhost"
echo "📊 Healthcheck    : http://localhost/healthz"
echo "🐘 PostgreSQL     : localhost:5432 (user: arborisis, pass: change-me)"
echo "🔴 Redis          : localhost:6379"
echo ""
echo "Commandes utiles :"
echo "  cd $DOCKER_DIR && $COMPOSE_CMD logs -f app"
echo "  cd $DOCKER_DIR && $COMPOSE_CMD exec app php artisan tinker"
echo "  cd $DOCKER_DIR && $COMPOSE_CMD exec app php artisan test"
echo ""
