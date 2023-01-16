const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all viaturas
router.get("/", (req, res) => {
  const sql = "SELECT * FROM viaturas";
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

// GET viatura by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM viaturas WHERE id = ?";
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

// POST a viatura
router.post("/", (req, res) => {
  const data = {
    prefixo: req.body.prefixo,
    marca: req.body.marca,
    placa: req.body.placa,
  };
  const sql = "INSERT INTO viaturas (prefixo, marca, placa) VALUES (?,?,?)";
  const params = [data.prefixo, data.marca, data.placa];
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

// PUT a viatura
router.put("/:id", (req, res) => {
  const data = {
    prefixo: req.body.prefixo,
    marca: req.body.marca,
    placa: req.body.placa,
  };
  const sql =
    "UPDATE viaturas SET prefixo = ?, marca = ?, placa = ? WHERE id = ?";
  const params = [data.prefixo, data.marca, data.placa, req.params.id];
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

// DELETE a viatura
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM viaturas WHERE id = ?";
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
