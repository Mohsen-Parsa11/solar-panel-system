# Solar Product Management & E-Commerce System

A modern web-based solar product management and e-commerce system for selling solar equipment online. The platform provides customers with an easy way to browse and purchase products, while administrators can manage products, categories, and customer orders through a dedicated dashboard.

## Features

### Customer

* Browse solar products
* Filter products by category
* View detailed product information
* Add products to cart
* Update product quantities
* Place orders
* View order information

### Admin Dashboard

* Dashboard overview
* Create, update, and delete products
* Manage product categories
* Manage product inventory
* View customer orders
* Update order status
* View order details

### Product Categories

The system supports different types of solar products:

* Solar Panels
* Batteries
* Inverters
* Accessories

## Tech Stack

* **Next.js** — Frontend and application framework
* **TypeScript** — Type-safe development
* **Tailwind CSS** — UI styling
* **Prisma** — Database ORM
* **MySQL** — Database
* **Zustand** — Client-side state management
* **Cloudinary** — Product image management
* **next-intl** — Internationalization

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your-database-url"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Add any additional environment variables required by your configuration.

### 4. Set up the database

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### 5. Run the development server

```bash
pnpm dev
```

Open the application at:

```text
http://localhost:3000
```

## Main Modules

### Product Management

Administrators can manage the complete product catalog, including:

* Product name
* Description
* Price
* Category
* Stock quantity
* Product images
* Product availability

### Order Management

The dashboard allows administrators to:

* View all orders
* View order details
* Review purchased products
* Manage order status
* Track customer information

## Languages

The application supports multiple languages using `next-intl`.

* English
* Dari/Pashto

## Development

Run the following commands during development:

```bash
pnpm dev
```

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

Run linting:

```bash
pnpm lint
```

## License

This project is developed for educational and commercial purposes. All rights reserved.
