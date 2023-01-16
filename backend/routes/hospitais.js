const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all hospitais
router.get("/", (req, res) => {
  const sql = "SELECT * FROM hospitais";
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

// GET hospital by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM hospitais WHERE id = ?";
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

// POST a hospital
router.post("/", (req, res) => {
  const data = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    endereco_id: req.body.endereco_id,
  };
  const sql =
    "INSERT INTO hospitais (nome, telefone, endereco_id) VALUES (?,?,?)";
  const params = [data.nome, data.telefone, data.endereco_id];
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

// PUT a hospital
router.put("/:id", (req, res) => {
  const data = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    endereco_id: req.body.endereco_id,
  };
  const sql =
    "UPDATE hospitais SET nome = ?, telefone = ?, endereco_id = ? WHERE id = ?";
  const params = [data.nome, data.telefone, data.endereco_id, req.params.id];
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

// DELETE a hospital
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM hospitais WHERE id = ?";
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
