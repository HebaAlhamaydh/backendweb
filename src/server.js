'use strict';
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 5050;
const express = require("express");
const app = express();
// app.use(cors("*"));
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const signup=require("./routes/signup")
const signin=require("./routes/signin")
const getUsers=require("./routes/gitUsers")
const secretstuff=require('./routes/secretStuff')

const v1Routes=require("./routes/v1");
const v2Router=require("./routes/v2");
const data =require("./data")

app.get("/", (req, res) => {
    res.send("welcome to amazon Homepage");
  });
  
  app.get("/api/products",(req,res)=>{
    res.send(data.products)
})

app.get("/api/products/slug/:slug",(req,res)=>{
    const product=data.products.find(x=>x.slug===req.params.slug)
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message:'product not found'})
    }
   
})
app.get("/api/products/:id",(req,res)=>{
    const product=data.products.find(x=>x._id===req.params.id)
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message:'product not found'})
    }
   
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
///router
app.use(signup);
app.use(signin);
app.use(getUsers)
app.use(secretstuff)
app.use('/v2',v2Router);
app.use('/v1',v1Routes);

app.use("*", notFoundHandler);
app.use(errorHandler); 



function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};