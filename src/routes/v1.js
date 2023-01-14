'use strict';

const express = require('express');
const dataModules = require('../models');
// const updateInfo= require('../routes/profile')
// const bearer = require('../middlewares/bearerAuth');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  console.log(modelName)
  if (dataModules[modelName]) {
    
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

// router.put('/change/username/:id',bearer,updateInfo.updateUsername)
// router.put('/change/password/:id',bearer,updateInfo.updatePassword)
/////////
router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);
router.get('/:model/:name',  getOneRecored);


async function handleGetAll(req, res) {
  let allRecords = await req.model.read();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.read(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.createRecord(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.updateRecord(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}
/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.name);
  let recored = await req.model.read(id);
  res.status(200).json(recored);
}

module.exports = router;