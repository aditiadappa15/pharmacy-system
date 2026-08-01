const db = require('../config/db');

const recommendMedicine = async (req, res) => {

    try {

        const { medicine_id } = req.params;

        const medicine = await db.query(
            "SELECT * FROM medicines WHERE medicine_id=$1",
            [medicine_id]
        );

        if (medicine.rows.length === 0) {

            return res.status(404).json({
                message: "Medicine not found"
            });

        }

        const category = medicine.rows[0].category;

        const recommendations = await db.query(
            `SELECT *
             FROM medicines
             WHERE category=$1
             AND medicine_id<>$2`,
            [category, medicine_id]
        );

        res.json({
            success: true,
            selected: medicine.rows[0],
            recommendations: recommendations.rows
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};

module.exports = {
    recommendMedicine
};