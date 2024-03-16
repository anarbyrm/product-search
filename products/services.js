const Product = require("./models");

const prepareQuery = (data) => {

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
    } = data;

    query = Product.find();

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

    return query;
}

module.exports = {
    prepareQuery
}