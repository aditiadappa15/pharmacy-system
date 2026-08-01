const db = require('../config/db');

const placeOrder = async (user_id, medicine_list) => {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        let total = 0;

        const orderResult = await client.query(
            `INSERT INTO orders(user_id,total_amount)
             VALUES($1,$2)
             RETURNING *`,
            [user_id, total]
        );

        const order = orderResult.rows[0];

        for (const item of medicine_list) {

            const medicine = await client.query(
                `SELECT * FROM medicines
                 WHERE medicine_id=$1`,
                [item.medicine_id]
            );

            if (medicine.rows.length === 0)
                throw new Error("Medicine Not Found");

            if (medicine.rows[0].stock < item.quantity)
                throw new Error("Insufficient Stock");

            total += medicine.rows[0].price * item.quantity;

            await client.query(
                `UPDATE medicines
                 SET stock=stock-$1
                 WHERE medicine_id=$2`,
                [item.quantity, item.medicine_id]
            );

            await client.query(
                `INSERT INTO order_items(order_id,medicine_id,quantity)
                 VALUES($1,$2,$3)`,
                [order.order_id, item.medicine_id, item.quantity]
            );
        }

        await client.query(
            `UPDATE orders
             SET total_amount=$1
             WHERE order_id=$2`,
            [total, order.order_id]
        );

        await client.query('COMMIT');

        return {
            order_id: order.order_id,
            total_amount: total
        };

    } catch (err) {

        await client.query('ROLLBACK');
        throw err;

    } finally {

        client.release();

    }
};
const getOrderDetails = async (orderId) => {

    const result = await db.query(
        `SELECT
            o.order_id,
            o.user_id,
            o.total_amount,
            o.order_date,
            oi.medicine_id,
            m.name,
            oi.quantity
        FROM orders o
        JOIN order_items oi
            ON o.order_id = oi.order_id
        JOIN medicines m
            ON oi.medicine_id = m.medicine_id
        WHERE o.order_id = $1`,
        [orderId]
    );

    return result.rows;
};
module.exports = {
    placeOrder,
    getOrderDetails
};