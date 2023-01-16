const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all escrivaes
router.get("/", (req, res) => {
  const sql = "SELECT * FROM escrivaes";
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

// GET escrivao by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM escrivaes WHERE id = ?";
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

// POST an escrivao
router.post("/", (req, res) => {
  const data = {
    nome: req.body.nome,
    dp: req.body.dp,
    plantao: req.body.plantao,
  };
  const sql = "INSERT INTO escrivaes (nome, dp, plantao) VALUES (?,?,?)";
  const params = [data.nome, data.dp, data.plantao];
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

// PUT an escrivao
router.put("/:id", (req, res) => {
  const data = {
    nome: req.body.nome,
    dp: req.body.dp,
    plantao: req.body.plantao,
  };
  const sql = "UPDATE escrivaes SET nome = ?, dp = ?, plantao = ? WHERE id = ?";
  const params = [data.nome, data.dp, data.plantao, req.params.id];
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

// DELETE an escrivao
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM escrivaes WHERE id = ?";
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
