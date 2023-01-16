const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all Declarações de Óbito
router.get("/", (req, res) => {
  const sql = "SELECT * FROM declaracoesObitos";
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

// GET Declaração de Óbito by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM declaracoesObitos WHERE id = ?";
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

// POST a Declaração de Óbito
router.post("/", (req, res) => {
  const data = {
    numeroControle: req.body.numeroControle,
    ano: req.body.ano,
    dataEmissao: req.body.dataEmissao,
    ocorrencia_id: req.body.ocorrencia_id,
  };
  const sql =
    "INSERT INTO declaracoesObitos (numeroControle, ano, dataEmissao, ocorrencia_id) VALUES (?,?,?,?)";
  const params = [
    data.numeroControle,
    data.ano,
    data.dataEmissao,
    data.ocorrencia_id,
  ];
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

// PUT a Declaração de Óbito
router.put("/:id", (req, res) => {
  const data = {
    numeroControle: req.body.numeroControle,
    ano: req.body.ano,
    dataEmissao: req.body.dataEmissao,
    ocorrencia_id: req.body.ocorrencia_id,
  };
  const sql =
    "UPDATE declaracoesObitos SET numeroControle = ?, ano = ?, dataEmissao = ?, ocorrencia_id = ? WHERE id = ?";
  const params = [
    data.numeroControle,
    data.ano,
    data.dataEmissao,
    data.ocorrencia_id,
    req.params.id,
  ];
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

// DELETE a Declaração de Óbito
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM declaracoesObitos WHERE id = ?";
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
