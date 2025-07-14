const db = require('../db/index');

exports.createOrder = async ({ customer_id, restaurant_id, items }) => {
    const client = await db.connect();

    const menuItemIds = items.map(i => i.menu_item_id);
    const result = await db.query(
        'SELECT id FROM menu_items WHERE id = ANY($1)',
        [menuItemIds]
    );
    if (result.rows.length !== items.length) {
        throw new Error('One or more menu_item_id are invalid');
    }

    try {
        await client.query('BEGIN');

        const orderRes = await client.query(
            `INSERT INTO orders (customer_id, restaurant_id, status) VALUES ($1, $2, 'pending') RETURNING *`,
            [customer_id, restaurant_id]
        );
        const orderId = orderRes.rows[0].id;

        for (const item of items) {
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
    const result = await db.query(`
        SELECT 
            o.id AS order_id, o.status, o.created_at,
            c.name AS customer_name, r.name AS restaurant_name,
            mi.name AS menu_item_name, oi.quantity
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        JOIN restaurants r ON o.restaurant_id = r.id
        JOIN order_items oi ON o.id = oi.order_id
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        ORDER BY o.created_at DESC;
    `);
    return result.rows;
};

exports.getOrdersByCustomer = async (customer_id) => {
    const result = await db.query(`
        SELECT 
            o.id AS order_id, o.status, o.created_at,
            r.name AS restaurant_name,
            mi.name AS menu_item_name, oi.quantity
        FROM orders o
        JOIN restaurants r ON o.restaurant_id = r.id
        JOIN order_items oi ON o.id = oi.order_id
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        WHERE o.customer_id = $1
        ORDER BY o.created_at DESC;
    `, [customer_id]);
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
    await db.query('DELETE FROM order_items WHERE order_id = $1', [id]);
    const result = await db.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};
