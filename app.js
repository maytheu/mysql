const express = require("express");
const exphbs = require("express-handlebars");

const pool = require("./query");
const user = require("./routes/user");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

// handlebars template engine
app.engine("hbs", exphbs({ extname: ".hbs" })); ///change extension name .hbs
app.set("view engine", "hbs");

// connect the created pool
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected!
  console.log(`connection id ${connection.threadId}`);
});

app.use("/", user);

app.listen(port, () => console.log(`Server started successfully on ${port}`));
