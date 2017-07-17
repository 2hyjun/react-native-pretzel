NodeJs

CREATE DATABASE pretzel CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE users (
    user_email VARCHAR(20) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    user_password CHAR(88) NOT NULL,
    user_univ VARCHAR(10) NOT NULL,
    user_major VARCHAR(20) NOT NULL,
    primary key(user_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE users MODIFY user_password CHAR(88) NOT NULL;

CREATE TABLE timeline_helpme (
    user_email VARCHAR(20) NOT NULL,
    content VARCHAR(10) NOT NULL,
    detailInfo TEXT(100) NOT NULL,
    expectedPrice int(5) NOT NULL,
    fee int(5) NOT NULL,
    deadline DATETIME NOT NULL,
    rid int(11) unsigned PRIMARY KEY auto_increment
) ENGINE=InnoDB DEFAULT CHARSET=utf8;