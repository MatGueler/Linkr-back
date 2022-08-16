CREATE TABLE users (
    id serial primary key,
    name varchar(50) not null,
    password text not null,
    email varchar(50) not null,
    "imageUrl" text not null
);


CREATE TABLE posts (
	"id" SERIAL PRIMARY KEY UNIQUE NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"url" TEXT NOT NULL,
	"description" TEXT,
    "imagePreview" TEXT NOT NULL,
    "titlePreview" TEXT,
    "descriptionPreview" TEXT,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()

 );

CREATE TABLE likes(
    id serial primary key,
    "likerId" integer not null references "users"("id"),
    "postId" integer not null references "posts"("id"),
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE hashtags (
    id serial primary key,
    name text not null
);

CREATE TABLE hashtags_posts (
    id serial primary key,
    "postId" integer not null references "posts"("id"),
    "hashtagId" integer not null references "hashtags"("id")
);

CREATE TABLE followers (
    id serial primary key,
    "mainUserId" integer not null references "posts"("id"),
    "followerId" integer not null references "hashtags"("id"),
    "followAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);