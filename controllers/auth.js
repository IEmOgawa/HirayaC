const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



//DATABASE Connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});


exports.register = (req, res) => {
console.log(req.body);

//fields in registration page
const {
        username,
        password,
        passwordConfirm
      } = req.body;


// database insert
      db.query("SELECT col_userName FROM tbl_users where col_userName = ?", [username], async (error, results) => {
        if (error) {
            console.log(error);
        } 

        if (results.length > 0) {
            return res.render('register', {
                message: 'Username already exist'
            });
        } else if ( password !== passwordConfirm) {
            return res.render('register', {
                message: 'Password do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query("INSERT INTO tbl_users SET ?", {col_userName: username, col_password: hashedPassword, col_Role: "Agent", col_isActive: "Yes"}, (error,results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results)
                return res.render('register', {
                    message: 'User register'
                });
            }
        });
      });


}