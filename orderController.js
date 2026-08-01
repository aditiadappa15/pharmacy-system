const Order = require('../models/orderModel');

const placeOrder = async (req, res) => {

    try {

        const { user_id, medicine_list } = req.body;

        const order = await Order.placeOrder(
            user_id,
            medicine_list
        );

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            data: order
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
const getOrderDetails = async (req, res) => {

    try {

        const order = await Order.getOrderDetails(req.params.id);

        res.json({
            success: true,
            data: order
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
module.exports = {
    placeOrder,
    getOrderDetails
};