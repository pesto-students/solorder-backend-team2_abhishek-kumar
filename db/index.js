// const { Pool, Client } = require('pg')
// const pool = new Pool(JSON.parse(process.env.DB_CONNECT_JSON))
// const client = new Client(JSON.parse(process.env.DB_CONNECT_JSON))
// // client.connect()
// module.exports = {pool,client};

const { Sequelize } = require('sequelize');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sequelize = new Sequelize(process.env.PG_CONNECT_URL, {
  // disable logging; default: console.log
  logging: false,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
    native:true
  }
})

module.exports = { sequelize, cloudinary };
