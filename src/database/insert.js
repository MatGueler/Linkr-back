import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const user = 'postgres';
const password = process.env.POSTGRES_PASSWORD;
const host = 'localhost';
const port = 5432;
const database = 'linkr';

async function createTable() {
	await connection.query(`
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
    
    CREATE TABLE reposts (
        id serial primary key,
        "postId" integer not null references "posts"("id"),
        "userId" integer not null references "users"("id"),
        "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE followers (
        id serial primary key,
        "mainUserId" integer not null references "users"("id"),
        "followerId" integer not null references "users"("id"),
        "followAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    -- cascade garante que não vai ter problema de foreign key
    CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        "userId" SERIAL NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "commentText" TEXT NOT NULL,
        "postId" SERIAL NOT NULL REFERENCES posts(id) ON DELETE CASCADE
    );
    `);
	console.log('Tabelas criadas');
}

const connection = new Pool({
	user,
	password,
	host,
	port,
	database,
});

createTable();
