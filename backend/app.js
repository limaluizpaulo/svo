const express = require("express");
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(cors());

// solve ns_error_dom_bad_uri error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

const falecidosRoutes = require("./routes/falecidos");
const familiaresRoutes = require("./routes/familiares");
const enderecosRoutes = require("./routes/enderecos");
const delegaciasRoutes = require("./routes/delegacias");
const hospitaisRoutes = require("./routes/hospitais");
const viaturasRoutes = require("./routes/viaturas");
const agentesRoutes = require("./routes/agentes");
const motoristasRoutes = require("./routes/motoristas");
const escrivaesRoutes = require("./routes/escrivaes");
const medicosRoutes = require("./routes/medicos");
const usersRoutes = require("./routes/users");
const ocorrenciasRoutes = require("./routes/ocorrencias");
const declaracoesObitosRoutes = require("./routes/declaracoesObitos");
const loginRoutes = require("./routes/login");
const naturezasRoutes = require("./routes/naturezas");
const tiposRoutes = require("./routes/tipos");
/*
/*
const registrosRoutes = require("./routes/registros");
const logsRoutes = require("./routes/logs");
const anexosRoutes = require("./routes/anexos");
const observacoesRoutes = require("./routes/observacoes");*/

app.use("/falecidos", falecidosRoutes);
app.use("/familiares", familiaresRoutes);
app.use("/enderecos", enderecosRoutes);
app.use("/delegacias", delegaciasRoutes);
app.use("/hospitais", hospitaisRoutes);
app.use("/viaturas", viaturasRoutes);
app.use("/agentes", agentesRoutes);
app.use("/motoristas", motoristasRoutes);
app.use("/escrivaes", escrivaesRoutes);
app.use("/medicos", medicosRoutes);
app.use("/users", usersRoutes);
app.use("/ocorrencias", ocorrenciasRoutes);
app.use("/declaracoes", declaracoesObitosRoutes);
app.use("/login", loginRoutes);
app.use("/naturezas", naturezasRoutes);
app.use("/tipos", tiposRoutes);
/*
app.use("/registros", registrosRoutes);
app.use("/logs", logsRoutes);
app.use("/anexos", anexosRoutes);
app.use("/observacoes", observacoesRoutes);*/

app.listen(5000, () => console.log("Server started"));

module.exports = app;
