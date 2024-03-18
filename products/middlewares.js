const { UserError, DetailError } = require("../utils/error");


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
        "maxRating",
        "limit",
        "offset"
    ];
    
    if (Object.keys(req.body).length > expectedKeys.length) {
        throw new UserError(`Invalid search or filter keys`);
    }
    
    for (let key in req.body) {
        if (!expectedKeys.includes(key)) {
            throw new UserError(`Invalid search or filter key: '${key}'`);
        }
    }
    
    next();
    
}


const addresses = {};

/**
 * Throttles requests for 5 request / min
 */
const throttleRequest = (req, res, next) => {
    const requestLimit = 5;
    const requestInterval = 60000;  // 60000 milliseconds = 1 min
    const ip = req.ip;

    const now = Date.now();

    if (!(ip in addresses)) {
        addresses[ip] = [];
    }

    currentAddress = addresses[ip];

    // Check if requested IP address contains elements
    // if so iterate through it and delete oldest request
    // if interval is reached.
    while (currentAddress.length > 0 && currentAddress[0] < (now - requestInterval)) {
        currentAddress.shift();
    }

    // check if request is within limits if not return error for error handler
    if (currentAddress.length >= requestLimit) {
        const error = new DetailError(429, "Too many requests, please try again later.");
        return next(error);
    }

    // push current time to the end of list
    currentAddress.push(now)

    next();

} 


module.exports = {
    validateBody,
    throttleRequest
}