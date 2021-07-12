const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: "",
});

// view route
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    //   user connected and quuery db
    connection.query(
      "SELECT * FROM user WHERE status='active'",
      (err, rows) => {
        //relaese the connection when done
        connection.release();

        if (!err) {
          let remove = req.query.delete;
          res.render("home", { rows, remove });
        } else {
          console.log(err);
        }
      }
    );
  });
};

//   find user
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    let search = req.body.search;

    //   user connected and quuery db
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?  ",
      ["%" + search + "%", "%" + search + "%"],
      (err, rows) => {
        //relaese the connection when done
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

//render new user
exports.newUser = (req, res) => {
  res.render("addUser");
};

// Add new User
exports.addUser = (req, res) => {
  const { first_name, last_name, comments, email, phone } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    //   user connected and quuery db
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        //relaese the connection when done
        connection.release();

        if (!err) {
          res.render("addUser", { alert: "User added successfully" });
        } else {
          res.render("addUser", { error: "error submitting form" });
        }
      }
    );
  });
};

//render edit user page
exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    //   user connected and quuery db
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        //relaese the connection when done
        connection.release();

        if (!err) {
          res.render("editUser", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.editUser = (req, res) => {
  const { first_name, last_name, comments, email, phone } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    //   user connected and quuery db
    connection.query(
      "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
      [first_name, last_name, email, phone, comments, req.params.id],
      (err, rows) => {
        //relaese the connection when done
        connection.release();

        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) throw err; // not connected!
            console.log(`connection id ${connection.threadId}`);

            //   user connected and quuery db
            connection.query(
              "SELECT * FROM user WHERE id = ?",
              [req.params.id],
              (err, rows) => {
                //relaese the connection when done
                connection.release();

                if (!err) {
                  res.render("editUser", {
                    rows,
                    alert: "User updated successfully",
                  });
                } else {
                  console.log(err);
                }
              }
            );
          });
        } else {
          res.render("addUser", { error: "error submitting form" });
        }
      }
    );
  });
};

exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    //   user connected and quuery db
    connection.query(
      // "DELETE * FROM user WHERE id = ? ",[req.params.id],
      "UPDATE  user SET status='delete' WHERE id = ? ",
      [req.params.id],
      (err, rows) => {
        //relaese the connection when done
        connection.release();

        if (!err) {
          let removedUser = encodeURIComponent("deleted");
          res.redirect("/?delete=" + removedUser);
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.details = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    //   user connected and quuery db
    connection.query(
      "SELECT * FROM user WHERE id= ? ",
      [req.params.id],
      (err, rows) => {
        //relaese the connection when done
        connection.release();

        if (!err) {
          res.render("view", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};
