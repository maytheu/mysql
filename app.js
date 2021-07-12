const express = require("express");
const exphbs = require("express-handlebars");
require("dotenv").config();
const mysql = require("mysql2");

const user = require('./routes/user')

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

// handlebars template engine
app.engine("hbs", exphbs({ extname: ".hbs" })); ///change extension name .hbs
app.set("view engine", "hbs");

// connect to mysql server by connection pooling
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: "",
});

// connect the created pool
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected!
  console.log(`connection id ${connection.threadId}`);
});

app.use('/', user)

app.listen(port, () => console.log(`Server started successfully on ${port}`));
