const { Router } = require('express');

const { getProducts, exportProducts } = require("./contollers");

const router = Router();

router.get('/products', getProducts);
router.post('/products/export', exportProducts);


module.exports = router;
