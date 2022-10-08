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
   Description text COLLATE pg_catalog."default",
   MatchsHistory text[] COLLATE pg_catalog."default",
   Date timestamp without time zone NOT NULL DEFAULT now(),
   match boolean NULL,
   toUse text COLLATE pg_catalog."default",
   toUses text[] COLLATE pg_catalog."default",
   
   PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "chat"(
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "user" character varying COLLATE pg_catalog."default",
	id SERIAL,
    "firstName" text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    text text COLLATE pg_catalog."default",
    roomsb text COLLATE pg_catalog."default"
);

CREATE TABLE IF NOT EXISTS "ongoingGame"(
	id SERIAL,
   JOUEUR_1_SOCKET text COLLATE pg_catalog."default",
   JOUEUR_1_PSEUDO text COLLATE pg_catalog."default",
   JOUEUR_2_SOCKET text COLLATE pg_catalog."default",
   JOUEUR_2_PSEUDO text COLLATE pg_catalog."default"
);

CREATE TABLE IF NOT EXISTS "gameHistory"(
   id SERIAL,
   JOUEUR_1 text COLLATE pg_catalog."default",
   JOUEUR_2 text COLLATE pg_catalog."default",
   VAINQUEUR text COLLATE pg_catalog."default",
   SCORE text COLLATE pg_catalog."default"
);

CREATE TABLE IF NOT EXISTS "chatMessage"(
   id SERIAL,
   userPseudo text COLLATE pg_catalog."default",
   userAvatar text COLLATE pg_catalog."default",
   text text COLLATE pg_catalog."default",
   Date timestamp without time zone NOT NULL DEFAULT now(),
   channelName text COLLATE pg_catalog."default",
   chatChannelId integer
);

CREATE TABLE IF NOT EXISTS "chatChannel"(
   id SERIAL,
   name text COLLATE pg_catalog."default",
   owner text COLLATE pg_catalog."default",
   admins text[] COLLATE pg_catalog."default",
   users text[] COLLATE pg_catalog."default",
   type text COLLATE pg_catalog."default",
   password text COLLATE pg_catalog."default"
);

INSERT INTO "chatChannel" (id, name, owner, type)
VALUES (0, "Général", "ADMIN", "Public");