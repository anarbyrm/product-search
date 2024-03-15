const express = require('express');
const dotenv = require('dotenv');

const productRoutes = require('./products/routes')

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
console.log(PORT)
app.use('/api/v1', productRoutes);

app.listen(PORT, () => {
    console.log("Server is up and running...");
})