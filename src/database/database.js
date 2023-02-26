import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const user = 'postgres';
const password = process.env.POSTGRES_PASSWORD;
const host = 'localhost';
const port = 5432;
const database = 'linkr';

const connection = new Pool({
	user,
	password,
	host,
	port,
	database,
});

export default connection;
