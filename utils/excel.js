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
        let data;

        if (prod instanceof Product) {
            data = { ...prod._doc };
        } else {
            data = prod
        }

        data.tags = data.tags.toString();
        data.price = data.price.toString();
        delete data._id;
        delete data.__v;
        return data;
    })

    worksheet.addRows(productRows);

    return workbook;
}
