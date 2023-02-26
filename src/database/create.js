import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const user = 'postgres';
const password = process.env.POSTGRES_PASSWORD;
const host = 'localhost';
const port = 5432;

async function createTable() {
	try {
		await firstConnection.query('DROP DATABASE linkr WITH (FORCE);');
		await firstConnection.query('CREATE DATABASE linkr');
	} catch (err) {
		await firstConnection.query('CREATE DATABASE linkr');
	}
	console.log('Banco criado');
}

const firstConnection = new Pool({
	user,
	password,
	host,
	port,
});

createTable();
