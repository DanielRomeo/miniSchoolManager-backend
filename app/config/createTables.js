const mysql = require("mysql");
const dbConfig = require("./db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

// run queries:
// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
 console.log("Successfully connected to the database.");
  let createStudents = `create table if not exists students(
                          id int primary key auto_increment,
                          firstname varchar(200)not null,
                          lastname varchar(200)not null,
                          studentnumber varchar(200)not null,
                          module varchar(200)not null,
                          active varchar(200)not null 
                      )`;


  connection.query(createStudents, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });


  let createTeachers = `create table if not exists teachers(
                          id int primary key auto_increment,
                          firstname varchar(200)not null,
                          lastname varchar(200)not null,
                          module varchar(200)not null,
                          available varchar(200)not null
                      )`;
   

  connection.query(createTeachers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log("teachers Table created Successfully");
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
});
