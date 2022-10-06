drop database if exists todo;
create database if not exists todo;

use todo;

create table task(
    id int primary key auto_increment,
    description varchar(255) not null
);

insert into task(description) value('Get more headpieces and blouses');
insert into task(description) value('Do not buy new dresses');