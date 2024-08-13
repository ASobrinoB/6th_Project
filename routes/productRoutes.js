const express = require('express');
const { createProduct, 
        readAllProducts,
        readProductById,
        updateProductById,
        deleteProductById
      } = require('../controllers/productController.js');

const productRouter = express.Router();

productRouter.post('/create', createProduct);
productRouter.get('/readall', readAllProducts);
productRouter.get('/readone/id:', readProductById);
productRouter.put('/update/id:', updateProductById);
productRouter.delete('/delete/id:', deleteProductById);

module.exports = productRouter;