const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

const products = [];

//--admin/add-product
router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

exports.routes = router;
exports.products = products;
