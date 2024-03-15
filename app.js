const express = require('express');
const dotenv = require('dotenv');

const productRoutes = require('./products/routes');
const connectDB = require('./utils/db');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/api/v1', productRoutes);


connectDB()
    .then(() => {
        console.log("database is up.\n");
        app.listen(PORT, () => {
            console.log("Server is up and running...");
        })
    })
    .catch(err => {
        console.log(err);
    })
