require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');


const dbName = process.env.DB_DATABASE;

const deletePreviousDatabase = async (pool) => {
  const sqlDeleteDatabase = `DROP DATABASE IF EXISTS ${dbName}`;
  try {
    await pool.query(sqlDeleteDatabase);
  } catch (error) {
    console.error('Error deleting prior database:', error);
  }
  console.log(`Deleted previous database (if existed) of ${process.env.DB_DATABASE}`);
}

const createDatabase = async (pool) => {
  const sqlCreateDbQuery = `CREATE DATABASE ${dbName}`  
  try {
    await pool.query(sqlCreateDbQuery)
    console.log(`Database ${dbName} created successfully.`);
  } catch (error) {
    console.error('Error creating the database:', error);
  }

};

const initialiseSchema = async (pool) => {
  const sqlInitSchemaQuery = fs.readFileSync(path.join(__dirname, '../src/database/migrations/001_initial_schema.sql'), 'utf8');
  try {
    console.log(sqlInitSchemaQuery);
    await pool.query(sqlInitSchemaQuery);
    console.log(`Created Tables.`);
  } catch (error) {
    console.error('Error creating tables', error);
  }
};

(async () => {
  const initPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  console.log(`Initialising postgres database -- ${dbName} --`);
  await deletePreviousDatabase(initPool);
  await createDatabase(initPool);
  initPool.end();

  // create new pool using created database
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: dbName,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await initialiseSchema(pool); 

  await pool.end();
})();
