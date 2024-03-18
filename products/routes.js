const { Router } = require('express');

const { getProducts, exportProducts } = require("./contollers");
const { validateBody, throttleRequest } = require('./middlewares');

const router = Router();

router.get('/', getProducts);
router.post('/export', [throttleRequest, validateBody], exportProducts);

module.exports = router;
