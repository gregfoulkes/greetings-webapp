drop table names;

create table names(
	id serial not null primary key,
	first_name text not null,
	greet_counter int default 0
);
