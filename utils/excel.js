const { Workbook } = require('exceljs');

const Product = require("../products/models");


exports.generateExcelFile = async (products) => {
    const workbook = new Workbook();
    
    const worksheet = workbook.addWorksheet("New Sheet");

    // adding columns
    columns = [];

    for (let key in Product.schema.obj) {
        columns.push({
            key,
            header: key.toUpperCase()
        });
    }

    worksheet.columns = columns;

    // filling rows with proper data
    const productRows = products.map((prod) => {

        prod.price = prod.price["$numberDecimal"];
        prod.tags = prod.tags.toString();
        delete prod._id;
        delete prod.__v;

        return prod;
    })

    worksheet.addRows(productRows);

    return workbook;
}
