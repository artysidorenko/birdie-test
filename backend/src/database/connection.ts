const mysql = require("mysql");
var util = require("util");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
});

pool.query = util.promisify(pool.query);

export default pool;
