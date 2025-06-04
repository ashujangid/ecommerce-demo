# 🛠️ eCommerce Checkout Backend API (Laravel)

This is the backend API for the eCommerce Checkout Flow Simulation project. It is built with Laravel and provides endpoints for listing products and submitting orders.

---

## 🚀 Getting Started – Local Setup

Follow the steps below to set up and run the Laravel API locally.

---

### 📦 1. Clone the Repository

```bash
git clone https://github.com/ashujangid/ecommerce-demo.git
cd ecommerce-demo

Duplicate the .env.example file
cp .env.example .env

Update the following variables in .env as per the requirements

Run Database Migrations
php artisan migrate

Start the Local Server
php artisan serve

API for products(static) (GET)
{APP_URL}/api/products

API for checkout (POST)
{APP_URL}/api/checkout