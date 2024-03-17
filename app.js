const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const productRoutes = require('./products/routes');
const connectDB = require('./utils/db');
const { errorHandler } = require('./utils/error');
const swaggerDocs = require('./doc/swagger');
const initiateRedisClient = require('./utils/redis');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/v1/products', productRoutes);

swaggerDocs(app);

app.use(errorHandler);

connectDB(process.env.MONGO_DB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is up and running...");
        })
    })
    .catch(err => {
        console.log(err);
    });
