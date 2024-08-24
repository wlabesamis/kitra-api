const db = require('../config/database');

/**
 * Authenticates a user by verifying their email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Array>} A promise that resolves to an array containing user details if authentication is successful; otherwise, an empty array.
 */
const login = async (email, password) => {
  const query = `
    SELECT id, name, age
    FROM users
    WHERE email = ? AND password = ? ;
  `;
  const [results] = await db.query(query, [email, password]);
  return results;
};


module.exports = { login };