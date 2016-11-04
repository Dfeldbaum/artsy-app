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
	photo_name varchar(255) not null,
	photo_date DATETIME,
	-- vote_count int,
	image_as_base64 text not null,
	user_id int not null references users(id), 
	primary key(id)
);


ALTER TABLE photos
   	ADD COLUMN image_as_base64 text
    AFTER photo_date;


ALTER TABLE photos DROP COLUMN vote_count;

ALTER TABLE photos
   	CHANGE photo_file image_as_base64 text not null;

ALTER TABLE photos
   	CHANGE vote_count image_as_base64 text not null;

ALTER TABLE users
   	ADD COLUMN first_name varchar(255) not null
    AFTER id;


ALTER TABLE photosdr
   	CHANGE photo_title photo_name varchar(255) not null;


ALTER TABLE photos
   	ADD COLUMN image_as_base64 text 
   	AFTER photo_date;



ALTER TABLE photos
   	CHANGE image_as_base64 image_as_base64 longtext;


ALTER TABLE photos
   	ADD COLUMN photo_price varchar(255) not null
   	AFTER photo_name;

ALTER TABLE photos
   	CHANGE photo_price photo_price varchar(255) not null;




ALTER TABLE photos
   	ADD COLUMN photo_medium varchar(255) not null
   	AFTER photo_size;
 

   	photo_size

   	photo_medium



