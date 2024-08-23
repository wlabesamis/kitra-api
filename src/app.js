const express = require('express');
const treasureRoutes = require('./routes/treasureRoutes');
const userRoutes = require('./routes/authRoutes');

const { swaggerUi, swaggerDocs } = require('./swagger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', treasureRoutes);
app.use('/api', userRoutes);

//error Handler
app.use(errorHandler);


module.exports = app;