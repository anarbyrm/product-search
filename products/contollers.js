const { generateExcelFile } = require("../utils/excel");
const Product = require("./models");
const { DetailError, UserError } = require('../utils/error');

const getProducts = async (req, res, next) => {
    try {

        let { 
            q,
            stock,
            available,
            tags,
            limit,
            offset,
            minPrice, 
            maxPrice,
            minRating,
            maxRating,
            category
        } = req.query;

        let query = Product.find();

        // building search products query on:
        // title, description, category, sku, barcode
        if (q) {
            query.find({
                $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { description: { $regex: q, $options: 'i' } },
                    { category: { $regex: q, $options: 'i' } },
                    { sku: { $regex: `^${q}$`, $options: 'i' } }, // search for exact sku value
                    { barcode: { $regex: `^${q}$`, $options: 'i' } }, // search for exact barcode value
                ]
            });
        }

        // building filter product query
        const filters = {}

        if (stock) {
            filters.inStock = stock;
        }

        if (available) {
            filters.isAvailable = available;
        }

        if (tags) {
            filters.tags = { $in: tags.split(',').map((el) => el.trim())};
        }

        // numeric filters
        // filtering by product prices
        if (maxPrice) {
            filters.price = { $lte: maxPrice };
        }

        if (minPrice) {
            if (!filters.price) filters.price = {};
 
            filters.price = { ...filters.price, $gte: minPrice};
        }

        // filtering by ratings
        if (maxRating) {
            filters.rating = { $lte: maxRating };
        }

        if (minRating) {
            if (!filters.rating) filters.rating = {};
 
            filters.rating = { ...filters.rating, $gte: minRating};
        }

        if (category) {
            filters.category = category.trim();
        }

        query = query.find(filters);

        // pagination - defaults to limit: 10, page: 1; max-limit: 100
        const MAX_LIMIT = 100;
        const DEFAULT_LIMIT = 10;
        const DEFAULT_OFFSET = 0;

        // checks if conversion of limit and offset to number type is successful
        // and if it falls within given constraints
        limit = isNaN(Number(limit)) ? DEFAULT_LIMIT : Math.min(Number(limit), MAX_LIMIT);
        offset = isNaN(Number(offset)) ? DEFAULT_OFFSET : Math.max(Number(offset), DEFAULT_OFFSET); 

        query = query.limit(limit).skip(offset);

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

        const searchFilters = req.body;

        const products = await Product.find(searchFilters);

        if (!searchFilters || Object.keys(searchFilters).length < 1) {
            throw new UserError('No filters exist');
        }

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