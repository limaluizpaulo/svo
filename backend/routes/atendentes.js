const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all atendentes
router.get("/", (req, res) => {
  const sql = "SELECT * FROM atendentes";
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

// GET atendente by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM atendentes WHERE id = ?";
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

// POST an atendente
router.post("/", (req, res) => {
  const data = {
    nome: req.body.nome,
    codigoFuncional: req.body.codigoFuncional,
    plantao: req.body.plantao,
  };
  const sql =
    "INSERT INTO atendentes (nome, codigoFuncional, plantao) VALUES (?,?,?)";
  const params = [data.nome, data.codigoFuncional, data.plantao];
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

// PUT an atendente
router.put("/:id", (req, res) => {
  const data = {
    nome: req.body.nome,
    codigoFuncional: req.body.codigoFuncional,
    plantao: req.body.plantao,
  };
  const sql =
    "UPDATE atendentes SET nome = ?, codigoFuncional = ?, plantao = ? WHERE id = ?";
  const params = [data.nome, data.codigoFuncional, data.plantao, req.params.id];
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

// DELETE an atendente
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM atendentes WHERE id = ?";
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
