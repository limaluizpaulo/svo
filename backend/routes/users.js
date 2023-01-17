const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all users
router.get("/", (req, res) => {
  const sql = "SELECT id, email, codigoFuncional, nome, plantao FROM users";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows.map((row) => {
        return {
          id: row.id,
          email: row.email,
          codigoFuncional: row.codigoFuncional,
          nome: row.nome,
          plantao: row.plantao,
        };
      }),
    });
  });
});

// GET atendente by id
router.get("/:id", (req, res) => {
  const sql =
    "SELECT id, email, codigoFuncional, nome, plantao FROM users WHERE id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: {
        id: row.id,
        email: row.email,
        codigoFuncional: row.codigoFuncional,
        nome: row.nome,
        plantao: row.plantao,
      },
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
    "INSERT INTO users (nome, codigoFuncional, plantao) VALUES (?,?,?)";
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
    "UPDATE users SET nome = ?, codigoFuncional = ?, plantao = ? WHERE id = ?";
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
  const sql = "DELETE FROM users WHERE id = ?";
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
