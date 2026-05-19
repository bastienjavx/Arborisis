#!/usr/bin/env bash
set -euo pipefail

# Arborisis — Setup serveur production (Ubuntu/Debian frais)
# Usage: curl -fsSL https://raw.githubusercontent.com/bastienjavx/Arborisis/dev/scripts/setup-server.sh | sudo bash
# Ou manuellement : sudo ./scripts/setup-server.sh

REPO_URL="https://github.com/bastienjavx/Arborisis.git"
INSTALL_DIR="${INSTALL_DIR:-/opt/arborisis}"
BRANCH="${BRANCH:-dev}"

echo "🌿 Arborisis — Setup serveur production"

# Détection OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo "❌ OS non supporté. Utilise Ubuntu ou Debian."
    exit 1
fi

# Vérifier root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Ce script doit être exécuté en root (ou avec sudo)."
    exit 1
fi

# Installer les dépendances système
echo "📦 Mise à jour du système..."
apt-get update
apt-get install -y --no-install-recommends ca-certificates curl gnupg git openssl perl

# Installer Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installation de Docker..."
    if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        install -m 0755 -d /etc/apt/keyrings
        curl -fsSL "https://download.docker.com/linux/$OS/gpg" -o /tmp/docker.gpg
        gpg --dearmor -o /etc/apt/keyrings/docker.gpg < /tmp/docker.gpg
        chmod a+r /etc/apt/keyrings/docker.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$OS $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
        apt-get update
        apt-get install -y --no-install-recommends docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
        rm -f /tmp/docker.gpg
    else
        echo "❌ OS non supporté pour l'installation automatique de Docker."
        exit 1
    fi
fi

systemctl enable docker
systemctl start docker

# Cloner ou mettre à jour le repo
if [ ! -d "$INSTALL_DIR/.git" ]; then
    echo "📥 Clonage du repo dans $INSTALL_DIR..."
    git clone --branch "$BRANCH" "$REPO_URL" "$INSTALL_DIR"
else
    echo "📥 Mise à jour du repo..."
    cd "$INSTALL_DIR"
    git fetch origin
    git reset --hard "origin/$BRANCH" || git reset --hard HEAD
fi

cd "$INSTALL_DIR"

DOCKER_DIR="$INSTALL_DIR/infrastructure/docker"
APP_DIR="$INSTALL_DIR/arborisis"

# Configurer l'env Docker
cd "$DOCKER_DIR"
if [ ! -f .env ]; then
    echo "📄 Configuration de infrastructure/docker/.env"
    cp .env.example .env
    # Générer un mot de passe aléatoire pour postgres
    DB_PASS=$(openssl rand -base64 24 | tr -d '=+/')
    perl -pi -e "s/^POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$DB_PASS/" .env
    perl -pi -e 's/^APP_ENV=.*/APP_ENV=production/' .env
    perl -pi -e 's/^APP_DEBUG=.*/APP_DEBUG=false/' .env
    perl -pi -e 's/^HTTP_PORT=.*/HTTP_PORT=80/' .env
fi

# Récupérer le mot de passe généré
DB_PASS=$(grep '^POSTGRES_PASSWORD=' "$DOCKER_DIR/.env" | cut -d= -f2-)

# Configurer l'env Laravel
cd "$APP_DIR"
if [ ! -f .env ]; then
    echo "📄 Configuration de arborisis/.env"
    cp .env.example .env

    perl -pi -e 's/^APP_ENV=.*/APP_ENV=production/' .env
    perl -pi -e 's/^APP_DEBUG=.*/APP_DEBUG=false/' .env
    perl -pi -e 's/^APP_URL=.*/APP_URL=http:\/\/localhost/' .env
    perl -pi -e 's/^DB_CONNECTION=.*/DB_CONNECTION=pgsql/' .env
    perl -pi -e 's/^#?\s*DB_HOST=.*/DB_HOST=postgres/' .env
    perl -pi -e 's/^#?\s*DB_PORT=.*/DB_PORT=5432/' .env
    perl -pi -e 's/^#?\s*DB_DATABASE=.*/DB_DATABASE=arborisis/' .env
    perl -pi -e 's/^#?\s*DB_USERNAME=.*/DB_USERNAME=arborisis/' .env
    perl -pi -e "s/^#?\s*DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" .env
    perl -pi -e 's/^CACHE_STORE=.*/CACHE_STORE=redis/' .env
    perl -pi -e 's/^SESSION_DRIVER=.*/SESSION_DRIVER=redis/' .env
    perl -pi -e 's/^QUEUE_CONNECTION=.*/QUEUE_CONNECTION=redis/' .env
    perl -pi -e 's/^REDIS_HOST=.*/REDIS_HOST=redis/' .env
    perl -pi -e 's/^BROADCAST_CONNECTION=.*/BROADCAST_CONNECTION=reverb/' .env
    perl -pi -e 's/^FILESYSTEM_DISK=.*/FILESYSTEM_DISK=local/' .env

    # Générer APP_KEY
    echo "🔑 Génération de APP_KEY..."
    APP_KEY=$(docker run --rm -v "$APP_DIR":/app -w /app php:8.4-cli php -r "echo 'base64:' . base64_encode(random_bytes(32));" 2>/dev/null)
    if [ -n "$APP_KEY" ]; then
        perl -pi -e "s/^APP_KEY=.*/APP_KEY=$APP_KEY/" .env
    else
        echo "⚠️  Impossible de générer APP_KEY automatiquement."
    fi
fi

# Build et lancer
cd "$DOCKER_DIR"
echo "🐳 Build et démarrage des conteneurs..."
docker compose --profile data --profile web --profile workers up -d --build

echo "⏳ Attente des services..."
for i in {1..60}; do
    if docker compose exec -T postgres pg_isready -U arborisis -d arborisis &>/dev/null; then
        echo "✅ PostgreSQL est prêt"
        break
    fi
    sleep 1
done

echo "🗄️  Migrations..."
docker compose exec -T app php artisan migrate --force

echo "🔗 Liens storage..."
docker compose exec -T app php artisan storage:link || true

echo "🚀 Optimisation..."
docker compose exec -T app php artisan optimize

echo "🔄 Redémarrage des workers..."
docker compose exec -T app php artisan queue:restart || true

IP=$(hostname -I | awk '{print $1}' 2>/dev/null || curl -s ifconfig.me 2>/dev/null || echo "localhost")

echo ""
echo "✅ Arborisis est déployé !"
echo ""
echo "🌐 Application    : http://$IP"
echo "📊 Healthcheck    : http://$IP/healthz"
echo ""
echo "⚠️  Prochaines étapes obligatoires :"
echo "   1. Configurer APP_URL dans $APP_DIR/.env"
echo "   2. Ajouter les clés S3/R2 (stockage audio/images)"
echo "   3. Ajouter les clés Stripe (si ECHO est utilisé)"
echo "   4. Configurer le SSL : Cloudflare Tunnel, Certbot, ou reverse proxy"
echo "   5. Modifier les secrets Discord/Bot si nécessaire"
echo ""
echo "Commandes utiles :"
echo "  cd $DOCKER_DIR && docker compose logs -f app"
echo "  cd $DOCKER_DIR && docker compose exec app php artisan tinker"
echo "  cd $DOCKER_DIR && docker compose exec app php artisan migrate"
echo ""
