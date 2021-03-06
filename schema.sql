-- this file is just for convenience of creating the tables locally

-- commands for creating tables

create table users(
	id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
	phone VARCHAR(10) NOT NULL CHECK (phone ~ '^[0-9]{10}$')
);

create table admins (
	id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
);

create table categories (
	category_id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE
);

create table dishes (
	id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE,
	category_id UUID NOT NULL,
	imageUrl  VARCHAR(300) NOT NULL,
	price NUMERIC(19, 2) NOT NULL CHECK (price > 0),
	CONSTRAINT fk_dishes_categories FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

create table orders (
	id UUID NOT NULL PRIMARY KEY,
	user_id UUID NOT NULL,
	totalprice NUMERIC(19, 2) NOT NULL CHECK (totalprice > 0),
	completed BOOLEAN NOT NULL,
	CONSTRAINT fk_orders_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

create table orderdishes (
	id UUID NOT NULL PRIMARY KEY,
	order_id UUID NOT NULL,
	dish_id UUID NOT NULL, 
    CONSTRAINT fk_orderdishes_orders FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
	CONSTRAINT fk_orderdishes_dishes FOREIGN KEY(dish_id) REFERENCES dishes(id) ON DELETE CASCADE
);

create table carts (
	id UUID NOT NULL PRIMARY KEY,
	user_id UUID NOT NULL,
	CONSTRAINT fk_carts_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE	
);

create table cartitems (
    id UUID NOT NULL PRIMARY KEY,
	cart_id UUID NOT NULL,
	dish_id UUID NOT NULL,
	quantity NUMERIC(19, 2) NOT NULL, 
	CONSTRAINT fk_cartitems_dishes FOREIGN KEY(dish_id) REFERENCES dishes(id) ON DELETE CASCADE,
	CONSTRAINT fk_cartitems_carts FOREIGN KEY(cart_id) REFERENCES carts(id) ON DELETE CASCADE
);