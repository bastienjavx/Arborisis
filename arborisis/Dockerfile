# syntax=docker/dockerfile:1.7

FROM php:8.4-fpm-bookworm AS php-base

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        ffmpeg \
        git \
        libfreetype6-dev \
        libicu-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libpq-dev \
        libzip-dev \
        unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        gd \
        intl \
        opcache \
        pcntl \
        pdo_pgsql \
        sockets \
        zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

FROM php-base AS vendor

WORKDIR /app

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --no-scripts \
    --optimize-autoloader

FROM node:22-bookworm AS assets

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
COPY --from=vendor /app/vendor ./vendor
RUN npm run build

FROM php-base AS runtime

COPY docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY docker/php/uploads.ini /usr/local/etc/php/conf.d/uploads.ini

COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /usr/local/bin/node /usr/local/bin/node
COPY --from=assets /app/node_modules ./node_modules
COPY --from=assets /app/bootstrap/ssr ./bootstrap/ssr
COPY --from=assets /app/public/build ./public/build
COPY --from=assets /app/public/sw.js ./public/sw.js

RUN cp -a public public.dist \
    && chown -R www-data:www-data storage bootstrap/cache public public.dist

COPY docker/scripts/entrypoint.sh /usr/local/bin/arborisis-entrypoint
RUN chmod +x /usr/local/bin/arborisis-entrypoint

ENTRYPOINT ["arborisis-entrypoint"]
CMD ["php-fpm"]
