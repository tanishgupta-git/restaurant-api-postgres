-- this file is just for convenience of creating the tables locally
create table users (
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

insert into dish (dish_uid,dish_name, category, imageUrl, price) values ('144ff676-093b-4173-8090-80f9ed313775','Basic Thali', 'Indian', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/thali-indian-1296x728-header.jpg', 500);
insert into admins (id,name,username,email, password) values (uuid_generate_v4(),'wer', 'wert05', 'indain123@gmail.com', "123345");



create table categories (
	category_id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
);

create table dishes (
	id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	category_id UUID NOT NULL,
	imageUrl  VARCHAR(300) NOT NULL,
	price NUMERIC(19, 2) NOT NULL CHECK (price > 0),
	CONSTRAINT fk_categories FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

