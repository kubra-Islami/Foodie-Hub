const db = require('../db/index.js');

exports.create = async ({ name, phone }) => {
    const result = await db.query(
        `INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *`,
        [name, phone]
    );
    return result.rows[0];
};

exports.getAll = async () => {
    const result = await db.query(`SELECT * FROM customers`);
    return result.rows;
};

exports.update = async (id, { name, phone }) => {
    const result = await db.query(
        `UPDATE customers SET name = $1, phone = $2 WHERE id = $3 RETURNING *`,
        [name, phone, id]
    );
    return result.rows[0];
};
exports.getById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM customers WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (err) {
        throw new Error('Error fetching customer by ID: ' + err.message);
    }
};
exports.remove = async (id) => {
    const result = await db.query(
        `DELETE FROM customers WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};
