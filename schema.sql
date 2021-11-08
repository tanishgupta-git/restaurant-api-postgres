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
)

create table orderdishes (
	id UUID NOT NULL PRIMARY KEY,
	order_id UUID NOT NULL,
	dish_id UUID NOT NULL, 
    CONSTRAINT fk_orderdishes_orders FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
	CONSTRAINT fk_orderdishes_dishes FOREIGN KEY(dish_id) REFERENCES dishes(id) ON DELETE CASCADE
)

create table carts {
	id UUID NOT NULL PRIMARY KEY,
	user_id UUID NOT NULL,
	CONSTRAINT fk_carts_users FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE	
}

create table cartitems {
    id UUID NOT NULL PRIMARY KEY,
	cart_id UUID NOT NULL,
	dish_id UUID NOT NULL,
	quantity NUMERIC(19, 2) NOT NULL, 
	CONSTRAINT fk_cartitems_dishes FOREIGN KEY(dish_id) REFERENCES dishes(id) ON DELETE CASCADE,
	CONSTRAINT fk_cartitems_carts FOREIGN KEY(cart_id) REFERENCES carts(id) ON DELETE CASCADE
}

-- command for inserting demo data
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Premium Thali', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 2500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Rasgulla 5pcs', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Dal Bati', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 1250);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Kachori', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Jalebi', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Mohan Thal', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Poha', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Rabdi', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 700);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Cake Mithai', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Malai Pak', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 400);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Aam Pak', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Gulab Jamun', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Bhujia', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Paneer Tikka', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Kadai Paneer', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 320);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Sev Tomato', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Matar Paneer', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 1200);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Aloo Gobhi', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Fryed Rice', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Roti 10', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 900);
insert into dishes (id,name,category_id, imageUrl,price) values (uuid_generate_v4(),'Masala Rice', '249a6217-4008-4ce3-982e-a20997de84d3', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);

insert into admins (id,name,username,email, password) values (uuid_generate_v4(),'admin', 'admin123', 'admin123@gmail.com', '123345');
insert into users (id, name, username, email, password, phone) values (uuid_generate_v4(),'test', 'test123', 'test123@gmail.com','123456','1234567890');
insert into categories (category_id,name) values (uuid_generate_v4(),'Rajasthani');