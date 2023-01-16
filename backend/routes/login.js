const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../database/db");
const bcrypt = require("bcrypt");

const secret = "yoursecretkey"; // replace with your own secret key

// Create a new user
router.post("/register", (req, res) => {
  // Get the user's credentials from the request body

  const { email, password } = req.body;

  // Hash the user's password

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Store the user's email and hash in the database

    db.run(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, hash],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.json({
          message: "success",
          data: { email, id: this.lastID },
        });
      }
    );
  });
});

// update a user
router.put("/update", (req, res) => {
  // Get the user's credentials from the request body

  const { email, password } = req.body;

  // Hash the user's password

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Store the user's email and hash in the database

    db.run(
      `UPDATE users SET password = ? WHERE email = ?`,
      [hash, email],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.json({
          message: "success",
          data: { email, id: this.lastID },
        });
      }
    );
  });
});

router.post("/", (req, res) => {
  // Get the user's credentials from the request body

  const { email, password } = req.body;

  // Verify the user's credentials against the database

  db.get(
    `SELECT id, email, password FROM users WHERE email = '${email}'`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!results) {
        res.status(400).json({ error: "Invalid email or password" });
        return;
      }

      // Compare the user's password against the hash stored in the database

      bcrypt.compare(password, results.password, (err, same) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        if (!same) {
          res.status(400).json({ error: "Invalid email or password" });
          return;
        }

        const token = jwt.sign(
          { email: results.email, id: results.id },
          secret,
          { expiresIn: "24h" }
        );

        // Send the token to the user

        res.json({
          message: "success",
          token,
        });
      });
    }
  );
});

module.exports = router;
