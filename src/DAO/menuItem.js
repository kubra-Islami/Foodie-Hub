const db = require('../db/index.js');

// exports.create = async ({ restaurant_id, name, price }) => {
//     const result = await db.query(
//         'INSERT INTO menu_items (restaurant_id, name, price) VALUES ($1, $2, $3) RETURNING *',
//         [restaurant_id, name, price]
//     );
//     return result.rows[0];
// };


exports.create = async ({name, description, price, is_available, restaurant_id}) => {
    const query = `
        INSERT INTO menu_items (name, description, price, is_available, restaurant_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [name, description, price, is_available, restaurant_id];
    const result = await db.query(query, values);
    return result.rows[0];
};

exports.getAllByRestaurant = async (restaurant_id) => {
    const result = await db.query(
        'SELECT * FROM menu_items WHERE restaurant_id = $1',
        [restaurant_id]
    );

    console.log(result.rows);
    return result.rows;
};


// exports.update = async (id, { name, price }) => {
//     const result = await db.query(
//         'UPDATE menu_items SET name = $1, price = $2 WHERE id = $3 RETURNING *',
//         [name, price, id]
//     );
//     return result.rows[0];
// };


exports.update = async (id, {name, description, price, is_available, restaurant_id}) => {
    const query = `
        UPDATE menu_items
        SET name          = $1,
            description   = $2,
            price         = $3,
            is_available  = $4,
            restaurant_id = $5
        WHERE id = $6 RETURNING *;
    `;
    const values = [name, description, price, is_available, restaurant_id, id];
    const result = await db.query(query, values);
    return result.rows[0];
};

exports.remove = async (id) => {
    const result = await db.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
};

exports.setAvailability = async (id, is_available) => {
    try {
        const result = await db.query(
            `UPDATE menu_items SET is_available = $1 WHERE id = $2 RETURNING *`,
            [is_available, id]
        );

        return result.rows[0];
    } catch (err) {
        throw new Error('Error toggling availability: ' + err.message);
    }
};
