const { Pool, Client } = require('pg')
const pool = new Pool(JSON.parse(process.env.DB_CONNECT_JSON))
const client = new Client(JSON.parse(process.env.DB_CONNECT_JSON))
// client.connect()
module.exports = {pool,client};