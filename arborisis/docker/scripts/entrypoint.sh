#!/usr/bin/env sh
set -eu

mkdir -p \
    storage/app \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/testing \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    public

if [ ! -d public/build ] && [ -d public.dist ]; then
    cp -a public.dist/. public/
fi

chown -R www-data:www-data storage bootstrap/cache public

if [ "${CONTAINER_SKIP_OPTIMIZE:-false}" != "true" ] && [ -n "${APP_KEY:-}" ]; then
    php artisan optimize:clear >/dev/null 2>&1 || true
    php artisan package:discover --ansi >/dev/null 2>&1 || true
    php artisan optimize >/dev/null 2>&1 || true
fi

if [ "${CONTAINER_STORAGE_LINK:-true}" = "true" ] && [ ! -L public/storage ]; then
    php artisan storage:link >/dev/null 2>&1 || true
fi

exec "$@"
