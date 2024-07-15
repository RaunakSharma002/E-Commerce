const fs = require('fs');
const path = require('path');

const pat = path.join(
    path.dirname(require.main.filename),
     'data', 'cart.json'
);

module.exports = class Cart{
   static addProduct(id, productPrice){
        //fetch the previous cart;
        fs.readFile(pat, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // analyze the cart i.e find existing product ;
            const existingProductIndex =  cart.products.findIndex(prod => prod.id == id);
            const existingProduct = cart.products[existingProductIndex];    
            let updatedProduct;
            // add new product i.e increasing quantity
            if(existingProduct){
                // ...existingProduct: taking all property of existingProduct a
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else{ 
                updatedProduct = {id : id, qty: 1}; //--no existing , so make new javascript object
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice; //-- "+" convert string to number

            fs.writeFile(pat, JSON.stringify(cart), (err)=>{
                console.log(err);
            });
        });
   }


   static deleteProduct(id, productPrice){
        fs.readFile(pat, (err, fileContent) =>{
            if(err){ //---not find cart, so can't delete
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product =  updatedCart.products.find(prod => prod.id === id);
            if(!product){ //--if product is not present then don't delete
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(pat, JSON.stringify(updatedCart), (err) =>{
                console.log(err);
            });
        });
   }

   static getCart(cb){
        fs.readFile(pat, (err, fileContent)=>{
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }   
        });
   }

}