var express = require("express");
const mysql = require('mysql');


var app = express();app.listen(5000, () => {
 console.log("Server running on port 5000");
});



const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5308danielromeo',
  database: 'newivyfashion'
});



con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});



app.get("/url", (req, res, next) => {
 
	con.query('SELECT * FROM posts', (err,rows) => {
	  if(err) throw err;

	  console.log('Data received from Db:');
	  res.json(rows);
	});


});