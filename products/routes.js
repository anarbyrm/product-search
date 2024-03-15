const { Router } = require('express');

const { getProducts, exportProducts } = require("./contollers");

const router = Router();

router.get('/', getProducts);
router.post('/export', exportProducts);

module.exports = router;
