//npm install express mysql body-parser --save
const express = require("express")
const bodyParser = require("body-parser")
// const var

const app = express()

//import dbconfig
const  conn = require("./app/models/db.js")


// parse request of content type so set that with body parser
app.use(bodyParser.json()) //json, raw, uniformed
app.use(bodyParser.urlencoded({extended:true})); // application/x-www-form

//set routing 
app.get("/",(req,res) => {
    res.json({ message:"welcome to bhavesh sadhu application" });
});

require("./app/routes/customer.route.js")(app);

//set port that server runing localhost:3000
app.listen(8080,() => {
    console.log("server run on http://127.0.0.1:8080");
});

//check mysql connection
conn.connect(error => {
    if(error) throw error;
    console.log("connected to MYSQL.");
});

