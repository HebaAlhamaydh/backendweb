"use strict";
require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const { Sequelize, DataTypes } = require("sequelize");

const itemsModel  = require('./items');
const userModel=require('./users');
const Collection =require('./data-collection');
const ordersModel = require('./orders');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,
                    rejectUnauthorized: false},
                native: true
            }
        } : {};


// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const userTable = userModel(sequelize, DataTypes);

const ordersTable = ordersModel(sequelize, DataTypes);
const ordersCollection=new Collection(ordersTable);

const itemsTable = itemsModel(sequelize, DataTypes);
const itemCollection=new Collection(itemsTable);

//relations
userTable.hasMany(ordersTable); // user many orders
ordersTable.belongsTo(userTable); // order one user

module.exports = {
    sequelize: sequelize,
    DataTypes:DataTypes,
  
    items:itemCollection,
    orders:ordersCollection,
    Users:userModel(sequelize, DataTypes)
};

