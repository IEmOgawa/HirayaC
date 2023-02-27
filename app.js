const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

const app = express();

dotenv.config({
    path: './.env'
});

//database connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("DB Connected")
    }
});
//----------------------------------------------
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded ({
    extended: false
}));  
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');


//Define routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server started on Port 5000");  
});