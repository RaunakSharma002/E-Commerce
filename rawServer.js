// const http = require('http');
const express = require('express'); //as request handler(routing req.url)
const bodyParser = require('body-parser'); //for making array, adding from buffer
 
const app = express(); //---request handler

//body parser: instead of use stramline(on('data') event) and buffer(on('end')); make the obj and add to it and use split function
app.use(bodyParser.urlencoded({extended: false}));


//  ///----exprss().use(): allow to add new middleware function; it accept array of request handler
// app.use((req, res, next)=>{ //function will be executed for every incoming request
//     ///---next is function: allow the request to travell next middleware
//     console.log('In the middleware');
//     next(); //--allows the request to continue to next middleware in line
// });

// app.use((req, res, next)=>{
//     console.log('Another middleware');
//     //--instead res.setHeader() or res.write(); we can use res.send() to send body of type any(i.e no need to setHeader(contentType) auto detect)
//     res.send('<h1> My Name is Raunak Sharma<h1>'); 
// });

app.use('/',(req, res, next)=>{ //---start from / i.e for every path; use next() for also go next middlware 
    next(); //not use next() for response is best practise
});
app.use('/add-product',(req, res, next)=>{ //not use next, so firstly check /add-product
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'); 
});
// app.use('/product', (req, res, next)=>{
//     //---body: don't parse the content so give undefined
//     console.log(req.body); //instead of use stramline(on('data') event) and buffer(on('end'))
//     //---use redirect() instead of setting stauts code 302 in err callback(execute in future after the uploading file)
//     res.redirect('/');
// });
app.post('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});
app.use('/',(req, res, next)=>{ //---start from / i.e for every path
    res.send('<h1> My Name is Raunak Sharma<h1>'); 
});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);

/*
    1).express is all about middleware
       (a) middleware: means that incoming request is funelled through bunch of function by exprssjs i.e
         REQUEST => MIDDLEWARE(req, res, next) => RESPONSE
        (b) instead of only one request handler, we have possiblity of multiple function which request is go through -
         until you send response; it allow to add third party packages
        (c) Middleware is written after creating requestHandler(express object) and before creating server
    2). if, we use 2 middleware by app.use() and not use next();
        then only first will execute, if we want that next middleware also execute then use next()
        so, it middleware code execute top to bottom , by writing next()
        if, we not write next() then we have to send the response, if we not send response then will die
    3). app.use() contains both get and post
    4). when form submitted and action will give the path
        incoming GET request from client side i.e type by client side
        post: give by user as response
 */