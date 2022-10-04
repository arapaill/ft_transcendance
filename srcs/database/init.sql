CREATE TABLE IF NOT EXISTS "users"(
	id SERIAL,
   name text COLLATE pg_catalog."default",
   "Full_Name" text COLLATE pg_catalog."default",
   two_factor boolean NULL,
   avatar text COLLATE pg_catalog."default",
   line_status text COLLATE pg_catalog."default",
   wins integer,
   losses integer,
   ladder_level integer,
   achievements text COLLATE pg_catalog."default",
   secret text COLLATE pg_catalog."default",
   email text COLLATE pg_catalog."default",
   "qrCode" text COLLATE pg_catalog."default",
   friends text[] COLLATE pg_catalog."default",
   "demFriends" text[] COLLATE pg_catalog."default",
   PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS "chat"
(
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "user" character varying COLLATE pg_catalog."default",
	id SERIAL,
    "firstName" text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    text text COLLATE pg_catalog."default",
    roomsb text COLLATE pg_catalog."default"
);
-- GRANT ALL PRIVILEGES ON DATABASE users TO $(POSTGRES_USER);