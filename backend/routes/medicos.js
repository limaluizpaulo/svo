const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all médicos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM medicos";
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

// GET médico by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM medicos WHERE id = ?";
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

// POST a médico
router.post("/", (req, res) => {
  const data = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    crm: req.body.crm,
  };
  const sql = "INSERT INTO medicos (nome, telefone, crm) VALUES (?,?,?)";
  const params = [data.nome, data.telefone, data.crm];
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

// PUT a médico
router.put("/:id", (req, res) => {
  const data = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    crm: req.body.crm,
  };
  const sql = "UPDATE medicos SET nome = ?, telefone = ?, crm = ? WHERE id = ?";
  const params = [data.nome, data.telefone, data.crm, req.params.id];
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

// DELETE a médico
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM medicos WHERE id = ?";
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
