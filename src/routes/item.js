// const express = require("express");
// const { json } = require("express/lib/response");
// const { items } = require("../models");
// // const bearer = require("../middleware/bearer");
// // const acl = require("../middleware/acl");

// const itemRouter = express.Router();

// // const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

// itemRouter.get("/item",   getAll);
// itemRouter.post("/item",   creatRecord);
// itemRouter.put("/item/:id",  updating);
// itemRouter.delete("/item/:id",  deleting);
// itemRouter.get("/item/:id",   getOneRecored);

// ////////////////creat=insert////////////////////
// async function creatRecord(req, res) {
//   let newitem = req.body;

//   let newRecored = await items.create(newitem);
  
//   res.status(201).json(newRecored);
// }
// ///////////select *//////////////////
// async function getAll(req, res) {
//   let items = await itemCollection.read();
//   res.status(200).json(items);
// }

// ///////////////update/////////
// async function updating(req, res) {
//   let id = parseInt(req.params.id);
//   let newRecored = req.body;
//   let found = await items.read(id);
//   if (found) {
//     let updated = await found.update(newRecored);
//     res.status(201).json(updated);
//   }
// }
// /////////////delete///////////////
// async function deleting(req, res) {
//   let id = parseInt(req.params.id);
//   let deleted = await items.delete(id);
//   res.status(204).json(deleted);
// }

// /////////////get one/////////////

// async function getOneRecored(req, res) {
//   const id = parseInt(req.params.id);
//   let recored = await items.read(id);
//   res.status(200).json(recored);
// }
// module.exports = itemRouter;