-- -- جدول رستوران‌ها
-- CREATE TABLE restaurants(
--     id         SERIAL PRIMARY KEY,
--     name       VARCHAR(100) NOT NULL,
--     address    TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- -- جدول آیتم‌های منو
-- CREATE TABLE menu_items(
--     id            SERIAL PRIMARY KEY,
--     name          VARCHAR(100)   NOT NULL,
--     description   TEXT,
--     price         NUMERIC(10, 2) NOT NULL,
--     is_available  BOOLEAN DEFAULT true,
--     restaurant_id INTEGER REFERENCES restaurants (id) ON DELETE CASCADE
-- );
--
-- -- جدول مشتری‌ها
-- CREATE TABLE customers(
--     id    SERIAL PRIMARY KEY,
--     name  VARCHAR(100) NOT NULL,
--     phone VARCHAR(20)  NOT NULL
-- );
--
-- -- جدول سفارش‌ها
-- CREATE TABLE orders(
--     id            SERIAL PRIMARY KEY,
--     customer_id   INTEGER REFERENCES customers (id) ON DELETE SET NULL,
--     restaurant_id INTEGER REFERENCES restaurants (id) ON DELETE SET NULL,
--     status        VARCHAR(20) DEFAULT 'pending',
--     created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
-- );
--
-- -- جدول آیتم‌های داخل سفارش
-- CREATE TABLE order_items(
--     id           SERIAL PRIMARY KEY,
--     order_id     INTEGER REFERENCES orders (id) ON DELETE CASCADE,
--     menu_item_id INTEGER REFERENCES menu_items (id) ON DELETE SET NULL,
--     quantity     INTEGER NOT NULL CHECK (quantity > 0)
-- );
CREATE TABLE restaurants(
    id         SERIAL NOT NULL PRIMARY KEY,
    name       VARCHAR(255),
    address    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_items(
    id            SERIAL NOT NULL PRIMARY KEY,
    name          VARCHAR(255),
    description   TEXT,
    price         NUMERIC(10, 2),
    is_available     BOOLEAN   DEFAULT true,
    restaurant_id INTEGER REFERENCES restaurants (id) ON DELETE CASCADE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers(
    id         SERIAL NOT NULL PRIMARY KEY,
    name       VARCHAR(255),
    phone      VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders(
    id            SERIAL NOT NULL PRIMARY KEY,
    customer_id   INTEGER REFERENCES customers (id) ON DELETE SET NULL,
    restaurant_id INTEGER REFERENCES restaurants (id) ON DELETE SET NULL,
    status        VARCHAR(20) DEFAULT 'pending',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items
(
    id           SERIAL NOT NULL PRIMARY KEY,
    order_id     INTEGER REFERENCES orders (id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items (id) ON DELETE SET NULL,
    quantity     INTEGER NOT NULL CHECK (quantity > 0),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
