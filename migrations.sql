create database artsy;
use artsy;


create table users (
	id int not null auto_increment,
	username varchar (255) not null,
	password_hash varchar(75) not null,
	primary key(id)
);	

ALTER TABLE users
   	ADD COLUMN first_name varchar(255) NOT NULL
    AFTER id;


create table photos (
	id int not null auto_increment,
	image_as_base64 text not null,
	photo_name varchar(255) not null,
	photo_date DATETIME,
	-- vote_count int,
	user_id int not null references users(id), 
	primary key(id)
);



ALTER TABLE photos
   	CHANGE photo_file image_as_base64 text not null;

ALTER TABLE photos
   	CHANGE photo_title photo_name varchar(255) not null;



