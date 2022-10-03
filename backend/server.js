const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

connectDB();


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize routes
app.use('/api/streaks', require('./routes/streakRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//error handler middleware
const {errorHandler} = require('./middleware/errorMiddleware');
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    });