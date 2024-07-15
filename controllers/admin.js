const Product = require('../models/product');
const { products } = require('../routes/admin');

exports.getAddProduct = (req, res, next) =>{
    res.render('admin/edit-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) =>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price); //give into product then call save so that not need to pass as argument
    product.save().
    then(()=>{
        res.redirect('/');
    }).
    catch(err => console.log(err));  
};

exports.getEditProduct = (req, res, next) =>{
    //--query parameter: in searchBar ?key=value & ; here edit is key and true is value; if not found then false
    //---qurery parameter: is use for filtering or traking
    const editMode = req.query.edit;
    if(!editMode){
       return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product =>{
        if(!product){
            res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    });
   
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    updatedProduct.save(); //already exist , save
    res.redirect('/admin/products');

}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};

exports.postDeleteProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};
