-- this file is just for convenience of creating the tables locally

-- commands for creating tables
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

create table categories (
	category_id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE
);

create table dishes (
	id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	category_id UUID NOT NULL,
	imageUrl  VARCHAR(300) NOT NULL,
	price NUMERIC(19, 2) NOT NULL CHECK (price > 0),
	CONSTRAINT fk_categories FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- command for inserting demo data
insert into admins (id,name,username,email, password) values (uuid_generate_v4(),'wer', 'wert05', 'indain123@gmail.com', "123345");
insert into categories (category_id,name) values (uuid_generate_v4(),'Rajasthani');