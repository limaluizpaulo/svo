const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Get all falecidos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM falecidos";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get a falecido
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM falecidos WHERE id = ?";
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

// Create a falecido
router.post("/", (req, res) => {
  const errors = [];
  if (!req.body.nome) {
    errors.push("No nome supplied");
  }

  if (!req.body.cpf) {
    errors.push("No cpf supplied");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const data = {
    nome: req.body.nome,
    obitoFetal: req.body.obitoFetal,
    rgOuRne: req.body.rgOuRne,
    cpf: req.body.cpf,
    nomeDoPai: req.body.nomeDoPai,
    nomeDaMae: req.body.nomeDaMae,
    naturalidade: req.body.naturalidade,
    nacionalidade: req.body.nacionalidade,
    sexo: req.body.sexo,
    racaCor: req.body.racaCor,
    dataNascimento: req.body.dataNascimento,
    idade: req.body.idade,
    estadoCivil: req.body.estadoCivil,
    profissao: req.body.profissao,
  };
  const sql =
    "INSERT INTO falecidos (nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const params = [
    data.nome,
    data.obitoFetal,
    data.rgOuRne,
    data.cpf,
    data.nomeDoPai,
    data.nomeDaMae,
    data.naturalidade,
    data.nacionalidade,
    data.sexo,
    data.racaCor,
    data.dataNascimento,
    data.idade,
    data.estadoCivil,
    data.profissao,
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

// Update a falecido
router.patch("/:id", (req, res) => {
  const data = {
    nome: req.body.nome,
    obitoFetal: req.body.obitoFetal,
    rgOuRne: req.body.rgOuRne,
    cpf: req.body.cpf,
    nomeDoPai: req.body.nomeDoPai,
    nomeDaMae: req.body.nomeDaMae,
    naturalidade: req.body.naturalidade,
    nacionalidade: req.body.nacionalidade,
    sexo: req.body.sexo,
    racaCor: req.body.racaCor,
    dataNascimento: req.body.dataNascimento,
    idade: req.body.idade,
    estadoCivil: req.body.estadoCivil,
    profissao: req.body.profissao,
  };
  db.run(
    `UPDATE falecidos set 
            nome = COALESCE(?,nome), 
            obitoFetal = COALESCE(?,obitoFetal), 
            rgOuRne = COALESCE(?,rgOuRne), 
            cpf = COALESCE(?,cpf), 
            nomeDoPai = COALESCE(?,nomeDoPai), 
            nomeDaMae = COALESCE(?,nomeDaMae), 
            naturalidade = COALESCE(?,naturalidade), 
            nacionalidade = COALESCE(?,nacionalidade), 
            sexo = COALESCE(?,sexo), 
            racaCor = COALESCE(?,racaCor), 
            dataNascimento = COALESCE(?,dataNascimento), 
            idade = COALESCE(?,idade), 
            estadoCivil = COALESCE(?,estadoCivil), 
            profissao = COALESCE(?,profissao) 
            WHERE id = ?`,
    [
      data.nome,
      data.obitoFetal,
      data.rgOuRne,
      data.cpf,
      data.nomeDoPai,
      data.nomeDaMae,
      data.naturalidade,
      data.nacionalidade,
      data.sexo,
      data.racaCor,
      data.dataNascimento,
      data.idade,
      data.estadoCivil,
      data.profissao,
      req.params.id,
    ],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

// Delete a falecido
router.delete("/:id", (req, res) => {
  db.run(
    "DELETE FROM falecidos WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});

module.exports = router;
