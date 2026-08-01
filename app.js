const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('./config/db');
require('./config/redis');

const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/recommend', aiRoutes);
app.use('/api/ai', aiRoutes);
app.get('/', (req, res) => {
    res.json({
        message: 'Pharmacy Order & Inventory Management API is running'
    });
});

module.exports = app;