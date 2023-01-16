import { Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import LayoutDashboard from "./layouts/Dashboard";
import Falecidos from "./pages/Falecidos";
import Viaturas from "./pages/Viaturas";
import Atendentes from "./pages/Atendentes";
import Medicos from "./pages/Medicos";
import Motoristas from "./pages/Motoristas";
import Familiares from "./pages/Familiares";
import Hospitais from "./pages/Hospitais";
import Declaracoes from "./pages/Declaracoes";
import Ocorrencias from "./pages/Ocorrencias";
import Escrivaes from "./pages/Escrivaes";
import Delegacias from "./pages/Delegacias";
import Agentes from "./pages/Agentes";
import Enderecos from "./pages/Enderecos";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cadastro from "./components/Cadastro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutDashboard />}>
        <Route index element={<Home />} />
        <Route path="/falecidos" element={<Falecidos />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/viaturas" element={<Viaturas />} />
        <Route path="/atendentes" element={<Atendentes />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/motoristas" element={<Motoristas />} />
        <Route path="/familiares" element={<Familiares />} />
        <Route path="/hospitais" element={<Hospitais />} />
        <Route path="/declaracoes" element={<Declaracoes />} />
        <Route path="/ocorrencias" element={<Ocorrencias />} />
        <Route path="/add-ocorrencia" element={<Cadastro />} />
        <Route path="/escrivaes" element={<Escrivaes />} />
        <Route path="/delegacias" element={<Delegacias />} />
        <Route path="/agentes" element={<Agentes />} />
        <Route path="/enderecos" element={<Enderecos />} />


      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
