import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const configDataBase = {
    connectionString: process.env.DATABASE_URL
}

if (process.env.MODE === "production") configDataBase.ssl = true;

const db = new Pool(configDataBase)

db.connect((error, client, done) => {
    if (error) {
        console.error('Error connecting to PostgresSQL', error);
    } else {
        console.log('Connected to PostgresSQL');
        done();
    }
});

export default db