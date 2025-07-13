const db = require('../db/index');

exports.getAll = async () => {
    const result = await db.query('SELECT * FROM restaurants');
    return result.rows;
};

exports.create = async ({ name, address }) => {
    try {
        const result = await db.query(
            'INSERT INTO restaurants (name, address) VALUES ($1, $2) RETURNING *',
            [name, address]
        );
        return result.rows[0];
    } catch (err) {
        throw new Error('Error creating restaurant: ' + err.message);
    }
};


exports.update = async (id, { name, address }) => {
    try {
        const result = await db.query(
            'UPDATE restaurants SET name = $1, address = $2 WHERE id = $3 RETURNING *',
            [name, address, id]
        );
        return result.rows[0];
    } catch (err) {
        throw new Error('Error updating restaurant: ' + err.message);
    }
};

exports.remove = async (id) => {
    try {
        const result = await db.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    } catch (err) {
        throw new Error('Error deleting restaurant: ' + err.message);
    }
};
