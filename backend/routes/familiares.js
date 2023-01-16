const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all familiares
router.get("/", (req, res) => {
  const sql = "SELECT * FROM familiares";
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

// GET familiar by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM familiares WHERE id = ?";
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

// POST a familiar
router.post("/", (req, res) => {
  const data = {
    nome: req.body.nome,
    parentesco: req.body.parentesco,
    rg: req.body.rg,
    endereco: req.body.endereco,
    telefone: req.body.telefone,
    celular: req.body.celular,
    falecido_id: req.body.falecido_id,
  };
  const sql =
    "INSERT INTO familiares (nome, parentesco, rg, endereco, telefone, celular, falecido_id) VALUES (?,?,?,?,?,?,?)";
  const params = [
    data.nome,
    data.parentesco,
    data.rg,
    data.endereco,
    data.telefone,
    data.celular,
    data.falecido_id,
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

// PUT a familiar
router.put("/:id", (req, res) => {
  const data = {
    nome: req.body.nome,
    parentesco: req.body.parentesco,
    rg: req.body.rg,
    endereco: req.body.endereco,
    telefone: req.body.telefone,
    celular: req.body.celular,
    falecido_id: req.body.falecido_id,
  };
  const sql =
    "UPDATE familiares SET nome = ?, parentesco = ?, rg = ?, endereco = ?, telefone = ?, celular = ?, falecido_id = ? WHERE id = ?";
  const params = [
    data.nome,
    data.parentesco,
    data.rg,
    data.endereco,
    data.telefone,
    data.celular,
    data.falecido_id,
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

// DELETE a familiar
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM familiares WHERE id = ?";
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
