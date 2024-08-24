const app = require('./app');

const PORT = process.env.PORT || 3000;

/**
 * Starts the Express server.
 * 
 * This script:
 * - Imports the Express application from the `app` module.
 * - Defines the port on which the server will listen. The port is either taken from the environment variable `PORT` or defaults to 3000.
 * - Starts the server and listens for incoming requests on the defined port.
 * - Logs a message indicating that the server is running and on which port.
 * 
 * @module server
 */

/**
 * Starts the Express server and listens for incoming connections.
 * 
 * @function
 * @name startServer
 * @memberof module:server
 * @param {number} port - The port number for the server to listen on.
 * @param {Function} callback - A callback function to be executed once the server starts successfully.
 */
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = server;