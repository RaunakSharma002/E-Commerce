// const fs = require('fs');
// const path = require('path');
// const { products } = require('../routes/admin');

const db = require('../util/database');
const Cart = require('./cart');

// const pat = path.join(
//     path.dirname(require.main.filename),
//      'data', 'products.json'
// );

// const getProductsFromFile = (cb) =>{
//     fs.readFile(pat, (err, fileContent)=>{
//         if(err){ 
//             cb([]);
//         }
//         else{
//             cb(JSON.parse(fileContent));
//         } 
//     });
// }

module.exports = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price; 
    }

    save(){
        // getProductsFromFile(products =>{
        //     if(this.id){ //---if already exist, then update
        //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        //         const updatedProducts = [...products]; 
        //         updatedProducts[existingProductIndex] = this; //this : is updated product made by constructor
        //         fs.writeFile(pat, JSON.stringify(updatedProducts), err=>{
        //             console.log(err);
        //         });
        //     }
        //     else{
        //         this.id = Math.random().toString(); //for unique id for each product page
        //         products.push(this);
        //         fs.writeFile(pat, JSON.stringify(products), err=>{
        //             console.log(err);
        //         });
        //     }
        // });

        return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', //--? for avoid SQL injection attack
         [this.title, this.price, this.imageUrl, this.description]
        );

    }

    static deleteById(id) {
        // getProductsFromFile(products =>{
        //     const product = products.find(prod => prod.id === id);
        //     // const productIndex = products.findIndex(prod => prod.id == prod.id); 
        //     //------save only which is not id, and discard the id because of delete
        //     const updatedProducts = products.filter(prod => prod.id !== id); //----use filter instead of find; give all element which satisfy
        //     fs.writeFile(pat, JSON.stringify(updatedProducts), err =>{
        //         if(!err){ //---if delete successfully i.e save only required product then also delete from cart
        //             Cart.deleteProduct(id, product.price);
        //         }
        //     });
        // });
    }

    static fetchAll(){
        // getProductsFromFile(cb);
       return db.execute('SELECT * FROM products');//--this return a callback value
       
    }

    static findById(id){
        // //---callBack gives return result to its caller function
        // getProductsFromFile(products =>{
        //     const product = products.find(p => p.id === id);  //find: method is part of js which will run a function to all product array
        //     cb(product);
        // }); 
        
        return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
    }

}