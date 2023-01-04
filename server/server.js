const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "saint_acutis_database",
});

connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Connected to database");
  }
});

let id;

const setOutput = (rows) => {
  id = rows.id;
  console.log(id);
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT id FROM patient WHERE username = ?",
    [username],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        if (result[0]) setOutput(result[0]);
      }
    }
  );

  connection.query(
    "CALL check_patient_password (?,?)",
    [username, password],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        if (result[0][0].UserExists == "1") res.send({ token: id });
        else res.send(result);
      }
    }
  );
});

app.post("/login-management", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT id FROM management WHERE username = ?",
    [username],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        if (result[0]) setOutput(result[0]);
      }
    }
  );

  connection.query(
    "CALL check_management_password (?,?)",
    [username, password],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        if (result[0][0].UserExists == "1") res.send({ token: id });
        else res.send(result);
      }
    }
  );
});

// Get list of appointments
app.get("/appointments", (req, res) => {
  connection.query("SELECT * FROM appointment", (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

// Get appointments for patient ID
app.get("/appointments/patient/:id", (req, res) => {
  connection.query(
    "SELECT * FROM appointment WHERE patient_id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Get appointment by ID
app.get("/appointments/:id", (req, res) => {
  connection.query(
    "SELECT * FROM appointment WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Create new appointment
app.post("/appointments", (req, res) => {
  const newAppointment = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    is_confirmed: req.body.is_confirmed,
    patient_id: req.body.patient_id,
    doctor_id: req.body.doctor_id,
    specialty_id: req.body.specialty_id,
  };
  connection.query(
    "INSERT INTO appointment SET ?",
    newAppointment,
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Update appointment by ID
app.put("/appointments/:id", (req, res) => {
  const updatedAppointment = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    is_confirmed: req.body.is_confirmed,
    patient_id: req.body.patient_id,
    doctor_id: req.body.doctor_id,
    specialty_id: req.body.specialty_id,
  };
  connection.query(
    "UPDATE appointment SET ? WHERE id = ?",
    [updatedAppointment, req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Delete appointment by ID
app.delete("/appointments/:id", (req, res) => {
  connection.query(
    "DELETE FROM appointment WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Get list of patients
app.get("/patients", (req, res) => {
  connection.query("SELECT * FROM patient", (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

// Get patient by ID
app.get("/patients/:id", (req, res) => {
  connection.query(
    "SELECT * FROM patient WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Create new patient
app.post("/patients", (req, res) => {
  const newPatient = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  connection.query(
    "INSERT INTO patient SET ?",
    newPatient,
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Update patient by ID
app.put("/patients/:id", (req, res) => {
  const updatedPatient = {
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
  };
  connection.query(
    "UPDATE patients SET ? WHERE id = ?",
    [updatedPatient, req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Delete patient by ID
app.delete("/patients/:id", (req, res) => {
  connection.query(
    "DELETE FROM patient WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Get doctors by specialty ID
app.get("/doctors/specialty/:id", (req, res) => {
  connection.query(
    "SELECT * FROM doctor WHERE specialty_id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Get doctors by ID
app.get("/doctors/:id", (req, res) => {
  connection.query(
    "SELECT * FROM doctor WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    }
  );
});

// Get list of doctors
app.get("/doctors", (req, res) => {
  connection.query("SELECT * FROM doctor", (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

app.listen(5000, () => {
  console.log("API server listening on port 5000");
});
