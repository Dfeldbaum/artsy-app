create database artsy;
use artsy;


create table users (
	id int not null auto_increment,
	username varchar (255) not null,
	password_hash varchar(75) not null,
	primary key(id)
);	

create table photos (
	id int not null auto_increment,
	photo_file text not null,
	photo_title varchar(255) not null,
	photo_date DATETIME,
	vote_count int,
	user_id int not null references users(id), 
	primary key(id)
);

