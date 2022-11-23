// const { Pool, Client } = require('pg')
// const pool = new Pool(JSON.parse(process.env.DB_CONNECT_JSON))
// const client = new Client(JSON.parse(process.env.DB_CONNECT_JSON))
// // client.connect()
// module.exports = {pool,client};

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_CONNECT_URL)

module.exports = sequelize;
