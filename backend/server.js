const Data = require('./data');
const API_PORT = 5000;
const http = require("http");
const { postgraphile } = require("postgraphile");

http
  .createServer(
    postgraphile(
      process.env.DATABASE_URL || 
      "postgres://mcwmotzg:lHaH0VRzaHD0oNAecVdF9vafhldRrE-b@motty.db.elephantsql.com:5432/mcwmotzg",
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