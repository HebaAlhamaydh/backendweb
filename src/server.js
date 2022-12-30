'use strict';
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
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
app.use(express.json());
app.use(cors());

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