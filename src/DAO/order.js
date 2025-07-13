// dao/orderDAO.js
const db = require('../db/index.js');

async function existsInTable(table, id) {
    const result = await db.query(`SELECT 1 FROM ${table} WHERE id = $1`, [id]);
    return result.rowCount > 0;
}

exports.createOrder = async ({ customer_id, restaurant_id, items }) => {
    if (!await existsInTable('customers', customer_id)) {
        throw new Error(`Customer with id ${customer_id} does not exist.`);
    }
    if (!await existsInTable('restaurants', restaurant_id)) {
        throw new Error(`Restaurant with id ${restaurant_id} does not exist.`);
    }
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Items must be a non-empty array.");
    }

    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const orderRes = await client.query(
            `INSERT INTO orders (customer_id, restaurant_id, status) VALUES ($1, $2, 'pending') RETURNING *`,
            [customer_id, restaurant_id]
        );
        const orderId = orderRes.rows[0].id;

        for (const item of items) {
            const menuItemExists = await client.query(
                `SELECT 1 FROM menu_items WHERE id = $1 AND restaurant_id = $2`,
                [item.menu_item_id, restaurant_id]
            );
            if (menuItemExists.rowCount === 0) {
                throw new Error(`Menu item with id ${item.menu_item_id} does not exist in restaurant ${restaurant_id}.`);
            }

            await client.query(
                `INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)`,
                [orderId, item.menu_item_id, item.quantity]
            );
        }

        await client.query('COMMIT');
        return orderRes.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};


exports.getAllOrders = async () => {
    const result = await db.query('SELECT * FROM orders');
    return result.rows;
};

exports.getOrdersByCustomer = async (customer_id) => {
    const result = await db.query('SELECT * FROM orders WHERE customer_id = $1', [customer_id]);
    return result.rows;
};

exports.updateOrderStatus = async (id, status) => {
    const result = await db.query(
        'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
    );
    return result.rows[0];
};

exports.deleteOrder = async (id) => {
    const result = await db.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

