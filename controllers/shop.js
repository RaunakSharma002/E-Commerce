const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = (req, res, next) =>{
    // Product.fetchAll((products)=>{
    //     res.render('shop/product-list', {
    //         prods: products,
    //         pageTitle: 'All Products',
    //         path: '/products',         
    //        }
    //     );
    // });

    Product.fetchAll()
    .then(([rows, feildData])=>{
        res.render('shop/product-list', {
            prods: rows,
            pageTitle: 'All Products',
            path: '/products',         
           }
        );
    })
    .catch(err => console.log(err));
   
};

exports.getProduct = (req, res, next)=>{ 
    const prodId = req.params.productId; 
    // Product.findById(prodId, product =>{
    //      //callback gives the return result to its caller function
    //     res.render('shop/product-detail',{
    //         product: product, //right is retrive from findById callBack
    //         pageTitle: product.title,
    //         path: '/products'
    //     });
    // });

    Product.findById(prodId)
    .then(([product])=>{
        res.render('shop/product-detail',{
            product: product[0], //right is retrive from findById callBack
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    // Product.fetchAll((products)=>{
    //     res.render('shop/index', {
    //         prods: products,
    //         pageTitle:  'Shop',
    //         path: '/',
    //     });
    // });
    
    Product.fetchAll()
    .then(([rows, feildData]) =>{ //--give call back vlaue of promise and we retrive by using destructuring[]
        console.log("getProducts working");
        console.log(rows[0]);
        res.render('shop/index', {
            prods: rows,
            pageTitle:  'Shop',
            path: '/',
        });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart =>{
        Product.fetchAll(products =>{
            const cartProducts = [];    
            for(product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData){ //if product is part of cart
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts,
            });
        });  
    });    
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log("prodId: ",prodId);
    Product.findById(prodId, (product)=>{
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.findById(prodId, product =>{
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}; 

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};