create table _menu(
	id SERIAL PRIMARY KEY,
	name varchar(255) NOT NULL,
	price money NOT NULL,
	description varchar(3000),
	weight INTEGER NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	updated_at TIMESTAMP NOT NULL DEFAULT now()
)

insert into _menu(name,price,weight) VALUES
('Пицца пепперони', 15, 700),
('Салат',10,3000),
('Шаурма',2,200);



create table _client(
	id SERIAL PRIMARY KEY,
	name varchar(255) NOT NULL,
	address varchar(1000) not null,
	phone varchar(11) NOT NULL
)

insert into _client(name, address, phone) values
('Иван','Боголюбова,21,кв 14', '88005553535'),
('Николай','Университетская,2,кв 11', '88005553536'),
('Вера','Пушкина,4,кв 27', '88005553531')
drop table order_menu
drop table _order
create table _order(
	id SERIAL PRIMARY KEY,
	client_id INTEGER NOT NULL REFERENCES _client(id),
	
	created_at TIMESTAMP NOT NULL DEFAULT now()
	
)

insert into _order(client_id) values
(1),
(1),
(1),
(2);

create table order_menu(
	order_id INTEGER NOT NULL REFERENCES _order(id),
	menu_id INTEGER NOT NULL REFERENCES _menu(id),
	count INTEGER NOT NULL,
	price money not NULL,
	PRIMARY KEY(order_id, menu_id)
)

insert into order_menu(order_id, menu_id, count,  price) values
(1,1,1,15),
(1,2,1,10),
(2,1,2,30),
(3,3,6,12),
(4,1,2,30)