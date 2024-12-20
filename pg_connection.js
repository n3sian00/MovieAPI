import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();

const pgPool = new pg.Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    password: process.env.PG_PW,
    user: process.env.PG_USER,
});

export default pgPool;