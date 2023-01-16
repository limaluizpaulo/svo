const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all endereços
router.get("/", (req, res) => {
  const sql = "SELECT * FROM enderecos";
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

// GET endereço by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM enderecos WHERE id = ?";
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

// POST an endereço
router.post("/", (req, res) => {
  const data = {
    rua: req.body.rua,
    numero: req.body.numero,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado,
    complemento: req.body.complemento,
    cep: req.body.cep,
  };
  const sql =
    "INSERT INTO enderecos (rua, numero, bairro, cidade, estado, complemento, cep) VALUES (?,?,?,?,?,?)";
  const params = [
    data.rua,
    data.numero,
    data.bairro,
    data.cidade,
    data.estado,
    data.complemento,
    data.cep,
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

// PUT an endereço
router.put("/:id", (req, res) => {
  const data = {
    rua: req.body.rua,
    numero: req.body.numero,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado,
    complemento: req.body.complemento,
    cep: req.body.cep,
  };
  const sql =
    "UPDATE enderecos SET rua = ?, numero = ?, bairro = ?, cidade = ?, estado = ?, complemento = ?, cep = ? WHERE id = ?";
  const params = [
    data.rua,
    data.numero,
    data.bairro,
    data.cidade,
    data.estado,
    data.complemento,
    data.cep,
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

// DELETE an endereço
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM enderecos WHERE id = ?";
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
