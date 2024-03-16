const { Router } = require('express');

const { getProducts, exportProducts } = require("./contollers");
const { validateBody } = require('./middlewares');

const router = Router();

router.get('/', getProducts);
router.post('/export', validateBody, exportProducts);

module.exports = router;
