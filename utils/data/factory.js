const fs = require('fs/promises');

const { Product } = require('../../products/models');


const createDummyProducts = async () => {
    try {
        const filePath = './dummy_data.json';

        const products = await fs.readFile(filePath);

        // bulk create with validation
        await Product.create(products);
        console.log("products created successfully..")

    } catch (err) {
        console.log(err);
    }
}

module.exports = createDummyProducts;
