const express = require('express');
const { getAllGuitars } = require('../controllers/guitarController');

const guitarRouter = express.Router();

guitarRouter.get('/readall', getAllGuitars); //http://localhost:3000/api/product/readall

module.exports = guitarRouter;