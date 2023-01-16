const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all motoristas
router.get("/", (req, res) => {
  const sql = "SELECT * FROM motoristas";
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

// GET motorista by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM motoristas WHERE id = ?";
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

// POST a motorista
router.post("/", (req, res) => {
  const data = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    plantao: req.body.plantao,
  };
  const sql = "INSERT INTO motoristas (nome, telefone, plantao) VALUES (?,?,?)";
  const params = [data.nome, data.telefone, data.plantao];
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

// PUT a motorista
router.put("/:id", (req, res) => {
  const data = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    plantao: req.body.plantao,
  };
  const sql =
    "UPDATE motoristas SET nome = ?, telefone = ?, plantao = ? WHERE id = ?";
  const params = [data.nome, data.telefone, data.plantao, req.params.id];
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

// DELETE a motorista
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM motoristas WHERE id = ?";
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
