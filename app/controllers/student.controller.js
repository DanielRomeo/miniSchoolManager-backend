const Student = require("../models/student.model.js");

// Create and Save a new Student
exports.create = (req, res) => {
	  
	  // Validate request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
      console.log("empty")
	  }

	  // Create a Student
	  const student = new Student({
	    lastname: req.body.lastname,
	    firstname: req.body.firstname,
      studentnumber: req.body.studentnumber,
      module: req.body.module,
	    active: req.body.active
	  });

	  // Save Student in the database
	  Student.create(student, (err, data) => {
	    if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the Student."
	      });
	    else res.send(data);
	  });

};




// Retrieve all Student from the database.
exports.findAll = (req, res) => {
  Student.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Student."
      });
    else res.send(data);
  });
};


// Find a single Student with a studentId
exports.findOne = (req, res) => {
  Student.findById(req.params.studentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with id " + req.params.studentId
        });
      }
    } else res.send(data);
  });
};

// Update a Student identified by the studentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Student.updateById(
    req.params.studentId,
    new Student(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.studentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Student with id " + req.params.studentId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Student with the specified studentId in the request
exports.delete = (req, res) => {
  Student.remove(req.params.studentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id " + req.params.studentId
        });
      }
    } else res.send({ message: `Student was deleted successfully!` });
  });
};

// Delete all Student from the database.
exports.deleteAll = (req, res) => {
  Student.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students."
      });
    else res.send({ message: `All Student were deleted successfully!` });
  });
};
