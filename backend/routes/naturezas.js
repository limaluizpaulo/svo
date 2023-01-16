const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all naturezas
router.get("/", (req, res) => {
  const sql = "SELECT * FROM naturezas";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// GET delegacia by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM naturezas WHERE id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// POST a delegacia
router.post("/", (req, res) => {
  const data = {
    natureza: req.body.natureza,
  };
  const sql = "INSERT INTO naturezas (natureza) VALUES (?)";
  const params = [data.natureza];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

// PUT a delegacia
router.put("/:id", (req, res) => {
  const data = {
    natureza: req.body.natureza,
  };
  const sql = "UPDATE naturezas SET natureza = ? WHERE id = ?";
  const params = [data.natureza, req.params.id];
  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      changes: this.changes,
    });
  });
});

// DELETE a delegacia
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM naturezas WHERE id = ?";
  const params = [req.params.id];
  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

module.exports = router;
