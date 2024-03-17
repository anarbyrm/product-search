const { generateExcelFile } = require("../utils/excel");
const { DetailError } = require('../utils/error');
const { fetchProducts } = require("./services");


const getProducts = async (req, res, next) => {
    try {

        const products = await fetchProducts(req.query);

        res.status(200).json({
            status: 'success',
            total: products.length,
            data: products
        })

    } catch (err) {
        next(err);
    }
}


const exportProducts = async (req, res, next) => {
    try {

        const products = await fetchProducts(req.body);

        if (products.length > 0) {
            const workbook = await generateExcelFile(products);

            res.set("Content-Disposition", `attachment; filename=data-${Date.now().toString()}.xls`);
            res.type("application/vnd.ms-excel");
            return await workbook.xlsx.write(res);
        }

        throw new DetailError(404, 'No products to be exported');

    } catch (err) {
        next(err);
    }
}


module.exports = {
    getProducts,
    exportProducts
}