const Medicine = require('../models/medicineModel');
const eventEmitter = require('../services/eventService');
const redisClient = require('../config/redis');

const addMedicine = async (req, res) => {

    try {

        const medicine = await Medicine.addMedicine(req.body);

        redisClient.del("medicines");

        res.status(201).json({
            success: true,
            message: "Medicine Added Successfully",
            data: medicine
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};

const updateStock = async (req, res) => {

    try {

        const medicine = await Medicine.updateStock(
            req.params.id,
            req.body.quantity
        );

        redisClient.del("medicines");

        if (medicine.stock < 10) {

            eventEmitter.emit("lowStock", medicine);

        }

        res.json({
            success: true,
            message: "Stock Updated Successfully",
            data: medicine
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};

const getMedicines = async (req, res) => {

    try {

        redisClient.get("medicines", async (err, data) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            if (data) {

                return res.json({
                    source: "Redis Cache",
                    data: JSON.parse(data)
                });

            }

            const medicines = await Medicine.getMedicines();

            redisClient.setex(
                "medicines",
                60,
                JSON.stringify(medicines)
            );

            res.json({
                source: "PostgreSQL",
                data: medicines
            });

        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};
const getLowStockMedicines = async (req, res) => {

    try {

        const medicines = await Medicine.getLowStockMedicines();

        res.json({
            success: true,
            count: medicines.length,
            data: medicines
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};

module.exports = {
    addMedicine,
    updateStock,
    getMedicines,
    getLowStockMedicines
};