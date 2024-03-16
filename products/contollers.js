const { generateExcelFile } = require("../utils/excel");
const { DetailError } = require('../utils/error');
const { prepareQuery } = require("./services");


const getProducts = async (req, res, next) => {
    try {

        let query = prepareQuery(req.query);

        // fetch products based on seach and filters
        const products = await query.exec();

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

        let query = prepareQuery(req.body);

        const products = await query.exec();

        if (products.length > 0) {
            const workbook = await generateExcelFile(products);

            res.set("Content-Disposition", `attachment; filename=data-${Date.now().toString()}.xlsx`);
            res.type("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
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