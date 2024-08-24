const users = require('../models/users');

/**
 * Validates a user's credentials by checking the provided email and password.
 *
 * This function interacts with the `users` model to verify if the credentials match any existing user
 * in the database. It returns the result of the `login` method from the `users` model, which typically 
 * includes user details if the credentials are correct, or an empty array if they are not.
 *
 * @async
 * @function
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns {Promise<Array>} A promise that resolves to an array containing user details if valid, otherwise an empty array.
 * @throws {Error} Throws an error if there is an issue with database interaction.
 */
const validateUser = async (email, password) => {
  return await users.login(email, password);
};

module.exports = { validateUser };