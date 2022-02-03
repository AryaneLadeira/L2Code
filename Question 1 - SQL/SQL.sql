/* QUESTÃO 1*/

/* SQL 1*/
SELECT categories.name, sum(products.amount) AS sum FROM products, categories WHERE id_categories = categories.id GROUP BY id_categories;

/*SQL 2*/
SELECT categories.id, categories.name AS categories, sum(orders.units_sold) AS sum FROM categories, products, orders_products AS orders
WHERE orders.product_id = products.id and products.id_categories = categories.id GROUP BY id_categories ORDER BY sum DESC LIMIT 4;