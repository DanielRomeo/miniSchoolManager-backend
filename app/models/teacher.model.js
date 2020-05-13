const sql = require("./db.js");

// constructor
const Teacher = function(teacher) {
  this.firstname = teacher.firstname;
  this.lastname = teacher.lastname;
  this.module = teacher.module;
  this.available = teacher.available;
};

Teacher.create = (newTeacher, result) => {
  sql.query("INSERT INTO teachers SET ?", newTeacher, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created teacher: ", { id: res.insertId, ...newTeacher });
    result(null, { id: res.insertId, ...newTeacher });
  });
};

Teacher.findById = (teacher, result) => {
  sql.query(`SELECT * FROM teachers WHERE id = ${teacher}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found teacher: ", res[0]);
      result(null, res[0]);
      return;

  }

    // not found Teacher with the id
    result({ kind: "not_found" }, null);
  });
};

Teacher.getAll = result => {
  sql.query("SELECT * FROM teachers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

  console.log("teacher: ", res);
    result(null, res);
  });
};



// Teacher.updateById = (id, teacher, result) => {
//   sql.query(
//     "UPDATE teachers SET email = ?, name = ?, active = ? WHERE id = ?",
//     [teacher.email, teacher.name, teacher.active, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found teacher with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated teacher: ", { id: id, ...teacher });
//       result(null, { id: id, ...teacher });
//     }
//   );
// };

Teacher.remove = (id, result) => {
  sql.query("DELETE FROM teachers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted teacher with id: ", id);
    result(null, res);
  });
};

Teacher.removeAll = result => {
  sql.query("DELETE FROM teachers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} teachers`);
    result(null, res);
  });
};

module.exports = Teacher;