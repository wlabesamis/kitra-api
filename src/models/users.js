const db = require('../config/database');

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