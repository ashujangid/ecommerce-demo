FROM php:8.2-fpm

WORKDIR /var/www

# Install system dependencies and PostgreSQL support
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql zip mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www/storage

EXPOSE 8000

# ✅ Instead of DNS edit, wait for DB host resolution at runtime
CMD bash -c "until getent hosts $DB_HOST; do echo 'Waiting for DB...'; sleep 2; done && php artisan serve --host=0.0.0.0 --port=8000"
