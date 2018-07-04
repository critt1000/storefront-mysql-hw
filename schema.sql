DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE  bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sapphire Necklace", "Jewelery", 125.75, 5),
("Red Dead Redemption 2", "Video Games", 60, 75),
("Dinner Table", "Furniture", 450, 12),
("Graphic T-Shirt", "Clothing", 29.99, 30),
("GTA 5", "Video Games", 49.99, 100),
("Dining Chairs", "Furniture", 39.99, 25),
("Diamond Ring", "Jewelery", 1200, 3),
("Wrangler Jeans", "Clothing", 39.99, 12),
("RC Car", "Toys", 89.99, 5),
("Hulu Hoop", "Toys", 19.99, 20)