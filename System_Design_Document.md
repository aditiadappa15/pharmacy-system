# System Design Document

# Pharmacy Order and Inventory Management System

## 1. Introduction

The Pharmacy Order and Inventory Management System is a backend application developed using Node.js, Express.js, PostgreSQL, and Redis. It helps manage medicine inventory, customer orders, stock updates, and medicine recommendations. The project follows the MVC architecture and RESTful API principles.

---

# 2. System Architecture

```
Client (Postman)

        │
        ▼

Express.js REST API

        │
        ▼

Controllers

        │
        ▼

Models

 ┌──────────────┬──────────────┐
 │              │              │
 ▼              ▼              ▼
PostgreSQL     Redis     EventEmitter
(Database)    (Cache)   (Low Stock Alert)
```

---

# 3. MVC Architecture

### Model

- Handles database operations.
- Communicates with PostgreSQL.

### View

- Postman API responses (Frontend not required).

### Controller

- Receives requests.
- Executes business logic.
- Returns responses.

---

# 4. Database Schema

## Medicines

| Column | Type |
|---------|------|
| medicine_id | SERIAL |
| name | VARCHAR |
| category | VARCHAR |
| stock | INTEGER |
| price | DECIMAL |

---

## Orders

| Column | Type |
|---------|------|
| order_id | SERIAL |
| user_id | INTEGER |
| total_amount | DECIMAL |
| order_date | TIMESTAMP |

---

## Order Items

| Column | Type |
|---------|------|
| id | SERIAL |
| order_id | INTEGER |
| medicine_id | INTEGER |
| quantity | INTEGER |

---

# 5. Redis Usage

Redis is used for:

- Caching medicine list.
- Improving API performance.
- Concurrency handling during order placement.

---

# 6. Event Flow

When medicine stock becomes less than 10:

```
Update Stock API

      │

      ▼

Check Stock

      │

      ▼

Stock < 10 ?

      │

     YES

      │

      ▼

Trigger EventEmitter

      │

      ▼

Low Stock Alert
```

---

# 7. AI Recommendation

The AI module recommends medicines belonging to the same category as the selected medicine.

Example:

Paracetamol

↓

Recommended Medicines

- Crocin
- Dolo

---

# 8. Error Handling

The system handles:

- Invalid requests
- Database errors
- Medicine not found
- Insufficient stock
- Internal server errors

---

# 9. Logging

Application logs include:

- API requests
- Database connection
- Redis connection
- Low stock alerts
- Error logs

---

# 10. Conclusion

The Pharmacy Order and Inventory Management System demonstrates backend development using Node.js, Express.js, PostgreSQL, Redis, MVC architecture, RESTful APIs, event-driven programming, and AI-based recommendation logic.