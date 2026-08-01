# Pharmacy Order and Inventory Management System

# API Documentation

Base URL

```
http://localhost:3000/api
```

---

# 1. Add Medicine

### Endpoint

```
POST /medicines
```

### Request Body

```json
{
  "name": "Paracetamol",
  "category": "Tablet",
  "stock": 100,
  "price": 20
}
```

### Success Response

```json
{
  "success": true,
  "message": "Medicine Added Successfully",
  "data": {
    "medicine_id": 1,
    "name": "Paracetamol",
    "category": "Tablet",
    "stock": 100,
    "price": "20.00"
  }
}
```

---

# 2. Update Stock

### Endpoint

```
PUT /medicines/:id/stock
```

Example

```
PUT /medicines/1/stock
```

### Request Body

```json
{
  "quantity": -10
}
```

### Response

```json
{
  "success": true,
  "message": "Stock Updated Successfully"
}
```

---

# 3. Get Medicine List

### Endpoint

```
GET /medicines
```

### Response

```json
{
  "source": "Redis Cache",
  "data": []
}
```

or

```json
{
  "source": "PostgreSQL",
  "data": []
}
```

---

# 4. Place Order

### Endpoint

```
POST /orders
```

### Request Body

```json
{
  "user_id": 1,
  "medicine_list": [
    {
      "medicine_id": 2,
      "quantity": 2
    },
    {
      "medicine_id": 3,
      "quantity": 1
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Order Placed Successfully",
  "data": {
    "order_id": 1,
    "total_amount": 55
  }
}
```

---

# 5. Get Order Details

### Endpoint

```
GET /orders/:id
```

Example

```
GET /orders/1
```

### Response

```json
{
  "success": true,
  "data": []
}
```

---

# 6. Low Stock Alert

### Endpoint

```
GET /medicines/low-stock
```

### Response

```json
{
  "success": true,
  "count": 1,
  "data": []
}
```

---

# 7. AI Medicine Recommendation

### Endpoint

```
GET /ai/:medicine_id
```

Example

```
GET /ai/2
```

### Response

```json
{
  "success": true,
  "selected": {},
  "recommendations": []
}
```