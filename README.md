# Pharmacy Order and Inventory Management System

## Project Overview

The Pharmacy Order and Inventory Management System is a backend application developed using Node.js, Express.js, PostgreSQL, and Redis. It manages medicine inventory, customer orders, stock updates, caching, event-driven notifications, and AI-based medicine recommendations.

This project follows the MVC architecture and RESTful API principles.

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Redis
- JavaScript
- Postman
- Git & GitHub

---

## Features

- Add Medicine
- Update Medicine Stock
- Get Medicine List
- Redis Caching
- Place Customer Order
- Get Order Details
- Low Stock Alert (Event Driven)
- AI Medicine Recommendation
- Logging and Error Handling

---

## Project Structure

```
PHARMACY
│
├── config
│   ├── db.js
│   └── redis.js
│
├── controllers
│
├── models
│
├── routes
│
├── services
│
├── .env
├── app.js
├── server.js
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <your-github-link>
```

### Install Packages

```bash
npm install
```

### Start PostgreSQL

Ensure PostgreSQL is running.

### Start Redis

Ensure Redis server is running.

### Create .env

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=pharmacy_db

REDIS_URL=redis://127.0.0.1:6379
```

### Run Project

```
npm run dev
```

---

## API Endpoints

### Medicine

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/medicines | Add Medicine |
| PUT | /api/medicines/:id/stock | Update Stock |
| GET | /api/medicines | Get Medicine List |
| GET | /api/medicines/low-stock | Low Stock Alert |

### Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/orders | Place Order |
| GET | /api/orders/:id | Get Order Details |

### AI

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/ai/:medicine_id | AI Medicine Recommendation |

---

## Database

### Medicines

- medicine_id
- name
- category
- stock
- price

### Orders

- order_id
- user_id
- total_amount
- order_date

### Order Items

- id
- order_id
- medicine_id
- quantity

---

## Redis Usage

- Medicine List Caching
- Concurrency Handling
- Performance Improvement

---

## Event Driven Feature

Low Stock Alert is implemented using Node.js EventEmitter.

Whenever stock falls below the threshold, an event is triggered.

---

## AI Feature

The system recommends medicines from the same category as the selected medicine.

---

## Developed By

Name:Aditi Adappa
USN:4SF24CS006
Department of Computer Science and Engineering