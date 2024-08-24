const mysql = require('mysql2');
require('dotenv').config();

/**
 * Creates a MySQL connection pool using environment variables for configuration.
 * 
 * The connection pool is used to manage multiple concurrent connections to the MySQL database.
 * Environment variables are loaded using the `dotenv` package to securely manage sensitive information like database credentials.
 * 
 * @type {mysql.Pool}
 * 
 * @property {string} host - The hostname of the database (e.g., localhost), set via the `DB_HOST` environment variable.
 * @property {string} user - The username to authenticate with the database, set via the `DB_USER` environment variable.
 * @property {string} password - The password for the database user, set via the `DB_PASSWORD` environment variable.
 * @property {string} database - The name of the database to connect to, set via the `DB_NAME` environment variable.
 * @property {number|string} connectionLimit - The maximum number of connections allowed in the pool, set via the `DB_CON_LIMIT` environment variable.
 * 
 * @returns {Promise<mysql.Pool>} A promise-based MySQL connection pool, enabling the use of async/await syntax for database queries.
 */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CON_LIMIT
});

module.exports = db.promise();