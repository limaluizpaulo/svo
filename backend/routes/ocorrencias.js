const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all Ocorrências
router.get("/", (req, res) => {
  const sql = "SELECT * FROM ocorrencias";
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

// GET Ocorrência by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM ocorrencias WHERE id = ?";
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

// POST an Ocorrência
router.post("/", (req, res) => {
  const data = {
    numeroControle: req.body.numeroControle,
    ano: req.body.ano,
    protocolo: req.body.protocolo,
    tipoLocal: req.body.tipoLocal,
    numeroBO: req.body.numeroBO,
    anoBO: req.body.anoBO,
    dataHoraChamado: req.body.dataHoraChamado,
    dataHoraEntrada: req.body.dataHoraEntrada,
    dataHoraLiberacao: req.body.dataHoraLiberacao,
    atendente_id: req.body.atendente_id,
    endereco_id: req.body.endereco_id,
    delegacia_id: req.body.delegacia_id,
    natureza: req.body.natureza,
    falecido_id: req.body.falecido_id,
    familiar_id: req.body.familiar_id,
    motorista_id: req.body.motorista_id,
    agente_id: req.body.agente_id,
    viatura_id: req.body.viatura_id,
    escrivao_id: req.body.escrivao_id,
    medico_id: req.body.medico_id,
  };
  const sql =
    "INSERT INTO ocorrencias (numeroControle, ano, protocolo, tipoLocal, numeroBO, anoBO, dataHoraChamado, dataHoraEntrada, dataHoraLiberacao, atendente_id, endereco_id, delegacia_id, natureza, falecido_id, familiar_id, motorista_id, agente_id, viatura_id, escrivao_id, medico_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const params = [
    data.numeroControle,
    data.ano,
    data.protocolo,
    data.tipoLocal,
    data.numeroBO,
    data.anoBO,
    data.dataHoraChamado,
    data.dataHoraEntrada,
    data.dataHoraLiberacao,
    data.atendente_id,
    data.endereco_id,
    data.delegacia_id,
    data.natureza,
    data.falecido_id,
    data.familiar_id,
    data.motorista_id,
    data.agente_id,
    data.viatura_id,
    data.escrivao_id,
    data.medico_id,
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

// PUT an Ocorrência
router.put("/:id", (req, res) => {
  const data = {
    numeroControle: req.body.numeroControle,
    ano: req.body.ano,
    protocolo: req.body.protocolo,
    tipoLocal: req.body.tipoLocal,
    numeroBO: req.body.numeroBO,
    anoBO: req.body.anoBO,
    dataHoraChamado: req.body.dataHoraChamado,
    dataHoraEntrada: req.body.dataHoraEntrada,
    dataHoraLiberacao: req.body.dataHoraLiberacao,
    atendente_id: req.body.atendente_id,
    endereco_id: req.body.endereco_id,
    delegacia_id: req.body.delegacia_id,
    natureza: req.body.natureza,
    falecido_id: req.body.falecido_id,
    familiar_id: req.body.familiar_id,
    motorista_id: req.body.motorista_id,
    agente_id: req.body.agente_id,
    viatura_id: req.body.viatura_id,
    escrivao_id: req.body.escrivao_id,
    medico_id: req.body.medico_id,
  };
  const sql =
    "UPDATE ocorrencias SET numeroControle = ?, ano = ?, protocolo = ?, tipoLocal = ?, numeroBO = ?, anoBO = ?, dataHoraChamado = ?, dataHoraEntrada = ?, dataHoraLiberacao = ?, atendente_id = ?, endereco_id = ?, delegacia_id = ?, natureza = ?, falecido_id = ?, familiar_id = ?, motorista_id = ?, agente_id = ?, viatura_id = ?, escrivao_id = ?, medico_id = ? WHERE id = ?";
  const params = [
    data.numeroControle,
    data.ano,
    data.protocolo,
    data.tipoLocal,
    data.numeroBO,
    data.anoBO,
    data.dataHoraChamado,
    data.dataHoraEntrada,
    data.dataHoraLiberacao,
    data.atendente_id,
    data.endereco_id,
    data.delegacia_id,
    data.natureza,
    data.falecido_id,
    data.familiar_id,
    data.motorista_id,
    data.agente_id,
    data.viatura_id,
    data.escrivao_id,
    data.medico_id,
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

// DELETE an Ocorrência
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM ocorrencias WHERE id = ?";
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
