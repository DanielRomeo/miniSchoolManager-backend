const Teacher = require("../models/teacher.model.js");

// Create and Save a new Teacher
exports.create = (req, res) => {
	  
	  // Validate request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
      console.log("empty")
	  }

	  // Create a Teacher
	  const teacher = new Teacher({
	    firstname: req.body.firstname,
	    lastname: req.body.lastname,
      module: req.body.module,
      available: req.body.available
	  });

	  // Save Teacher in the database
	  Teacher.create(teacher, (err, data) => {
	    if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the Teacher."
	      });
	    else res.send(data);
	  });

};




// Retrieve all Teacher from the database.
exports.findAll = (req, res) => {
  Teacher.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Teacher."
      });
    else res.send(data);
  });
};


// Find a single Teacher with a teacherId
exports.findOne = (req, res) => {
  Teacher.findById(req.params.teacherId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teacher with id ${req.params.teacherId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teacher with id " + req.params.teacherId
        });
      }
    } else res.send(data);
  });
};

// Update a Teacher identified by the teacherId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Teacher.updateById(
    req.params.teacherId,
    new Teacher(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Teacher with id ${req.params.teacherId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Teacher with id " + req.params.teacherId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Teacher with the specified teacherId in the request
exports.delete = (req, res) => {
  Teacher.remove(req.params.teacherId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teacher with id ${req.params.teacherId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Teacher with id " + req.params.teacherId
        });
      }
    } else res.send({ message: `Teacher was deleted successfully!` });
  });
};

// Delete all Teacher from the database.
exports.deleteAll = (req, res) => {
  Teacher.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all teachers."
      });
    else res.send({ message: `All Teacher were deleted successfully!` });
  });
};
