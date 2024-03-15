getProducts = (req, res, next) => {
    try{

        res.json({
            status: 'success',
            data: []
        })

    } catch (err) {
        next(err);
    }
}

exportProducts = (req, res, next) => {
    try {
        res.send("products.xml exported");
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getProducts,
    exportProducts
}