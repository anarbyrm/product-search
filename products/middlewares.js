const { UserError } = require("../utils/error");

const validateBody = (req, res, next) => {
    const expectedKeys = [ 
        "q",
        "stock",
        "available",
        "tags",
        "category",
        "minPrice",
        "maxPrice",
        "minRating",
        "maxRating" 
    ];

    for (let key in req.body) {
        if (!expectedKeys.includes(key)) {
            throw new UserError(`Invalid search or filter key: '${key}'`);
        }
    }

    next();
}

module.exports = {
    validateBody
}