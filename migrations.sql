create database artsy;
use artsy;


create table users (
	id int not null auto_increment,
	username varchar (255) not null,
	password_hash varchar(75) not null,
	primary key(id)
);	

ALTER TABLE photos
   	ADD COLUMN image_as_base64 text not null
    AFTER vote_count;


create table photos (
	id int not null auto_increment,
	photo_name varchar(255) not null,
	photo_date DATETIME,
	-- vote_count int,
	image_as_base64 text not null,
	user_id int not null references users(id), 
	primary key(id)
);


ALTER TABLE photos DROP COLUMN vote_count;

ALTER TABLE photos
   	CHANGE photo_file image_as_base64 text not null;

ALTER TABLE photos
   	CHANGE vote_count image_as_base64 text not null;



