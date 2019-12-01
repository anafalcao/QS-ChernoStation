const Data = require('./data');
const API_PORT = 5000;
const http = require("http");
const { postgraphile } = require("postgraphile");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    "postgres://mcwmotzg:lHaH0VRzaHD0oNAecVdF9vafhldRrE-b@motty.db.elephantsql.com:5432/mcwmotzg",
  max: 3
})

http
  .createServer(
    postgraphile(
      pool,
      "public",
      {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        enableCors: true,
      }
    )
  )
  .listen(process.env.PORT || API_PORT);