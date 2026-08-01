const db = require('../config/db');

const addMedicine = async (medicine) => {
    const { name, category, stock, price } = medicine;

    const result = await db.query(
        `INSERT INTO medicines(name, category, stock, price)
         VALUES($1, $2, $3, $4)
         RETURNING *`,
        [name, category, stock, price]
    );

    return result.rows[0];
};

const updateStock = async (id, quantity) => {

    const result = await db.query(
        `UPDATE medicines
         SET stock = stock + $1
         WHERE medicine_id = $2
         RETURNING *`,
        [quantity, id]
    );

    return result.rows[0];
};

const getMedicines = async () => {

    const result = await db.query(
        `SELECT * FROM medicines ORDER BY medicine_id`
    );

    return result.rows;
};
const getLowStockMedicines = async () => {

    const result = await db.query(
        `SELECT * FROM medicines
         WHERE stock < 10
         ORDER BY medicine_id`
    );

    return result.rows;
};

module.exports = {
    addMedicine,
    updateStock,
    getMedicines,
    getLowStockMedicines
};