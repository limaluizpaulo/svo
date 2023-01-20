import { useEffect, useState } from "react";
import api from "../../../api/server";
import { useSvo } from "../../../context/svo";

/* 
{
  "0": {
    "id": 1,
    "rua": "Avenida Paulista",
    "numero": 1374,
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "estado": "SP",
    "complemento": "Edifício Itália"
  }
}
*/

interface Tipos {
  id: string;
  nome: string;
}

interface DataTipos {
  data: [Tipos];
}

interface Local {
  id: number;
  name: string;
}

interface Data {
  data: [Local];
}

interface Hospitais {
  id: string;
  nome: string;
  telefone: string;
  endereco_id: string;
}

interface HospitaisData {
  data: [Hospitais];
}

export default function AddLocal() {
  const {
    tipoLocal,
    setTipoLocal,
    hospital,
    setHospital,
    cepOcorrencia,
    setCepOcorrencia,
    ruaOcorrencia,
    setRuaOcorrencia,
    numeroOcorrencia,
    setNumeroOcorrencia,
    bairroOcorrencia,
    setBairroOcorrencia,
    cidadeOcorrencia,
    setCidadeOcorrencia,
    estadoOcorrencia,
    setEstadoOcorrencia,
    complementoOcorrencia,
    setComplementoOcorrencia,
    dataOcorrencia,
    setDataOcorrencia,
  } = useSvo();

  const [tipoData, setTipoData] = useState<Tipos[]>([]);
  const [hospitalData, setHospitalData] = useState<Hospitais[]>([]);

  async function getHospitais() {
    const { data }: HospitaisData = await api(`/hospitais`);
    setHospitalData(data);
  }



  useEffect(() => {
    getHospitais();
  }, []);

  async function getTipos() {
    const { data }: DataTipos = await api(`/tipos`);
    setTipoData(data);
  }

  useEffect(() => {
    getTipos();
  }, []);

  async function buscarCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    });

    const data = await response.json();

    setRuaOcorrencia(data.logradouro);
    setBairroOcorrencia(data.bairro);
    setCidadeOcorrencia(data.localidade);
    setEstadoOcorrencia(data.uf);
  }

  useEffect(() => {
    if (cepOcorrencia.length === 8) {
      buscarCep(cepOcorrencia);
    }
  }, [cepOcorrencia]);

  return (
    <div className="mx-5 px-5">
      <hr />

      <div className="d-flex justify-content-between align-items-center">
        <div className="mb-3">
          <input
            onChange={(e) => setDataOcorrencia(e.target.value)}
            value={dataOcorrencia}
            type="datetime-local"
            className="form-control"
            id="dataOcorrencia"
            placeholder="Data da Ocorrência"
            required
          />
        </div>
        <div className="mb-3 col-3">
          <select
            id="tipoSelect"
            className="form-select"
            aria-label="Default select example"
            value={tipoLocal}
            onChange={(e) => setTipoLocal(Number(e.target.value))}
          >
            <option defaultValue={0}>Selecionar Tipo de Local</option>
            {tipoData.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
          </select>
        </div>
        {tipoLocal === 2 && (
          <div className="mb-3 col-5">
            <select
              className="form-select"
              id="hospitalSelect"
              aria-label="Default select example"
              value={hospital}
              onChange={(e) => setHospital(Number(e.target.value))}
            >
              <option defaultValue={""}>Selecionar Hospital</option>
              {hospitalData.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.nome}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-center">
        <div className="mb-3 d-flex">
          <input
            disabled={tipoLocal === 2}
            onChange={(e) => setCepOcorrencia(e.target.value.replace(/\D/g, ""))}
            value={cepOcorrencia}
            type="text"
            className="form-control"
            id="cep"
            placeholder="CEP"
          />
        </div>
        <div className="mb-3 col-5">
          <input
            disabled={tipoLocal === 2}
            onChange={(e) => setRuaOcorrencia(e.target.value)}
            value={ruaOcorrencia}
            type="text"
            className="form-control"
            id="rua"
            placeholder="Logradouro"
          />
        </div>

        <div className="mb-3">
          <input
            disabled={tipoLocal === 2}
            onChange={(e) => setNumeroOcorrencia(e.target.value)}
            value={numeroOcorrencia}
            type="text"
            className="form-control"
            id="numero"
            placeholder="Numero"
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <input
            disabled={tipoLocal === 2}
            type="text"
            className="form-control"
            id="complemento"
            placeholder="Complemento"
            value={complementoOcorrencia}
            onChange={(e) => setComplementoOcorrencia(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            disabled={tipoLocal === 2}
            onChange={(e) => setBairroOcorrencia(e.target.value)}
            value={bairroOcorrencia}
            type="text"
            className="form-control"
            id="bairro"
            placeholder="Bairro"
          />
        </div>

        <div className="mb-3">
          <input
            disabled={tipoLocal === 2}
            onChange={(e) => setCidadeOcorrencia(e.target.value)}
            value={cidadeOcorrencia}
            type="text"
            className="form-control"
            id="cidade"
            placeholder="Cidade"
          />
        </div>
        <div className="mb-3">
          <input
            disabled={tipoLocal === 2}
            onChange={(e) => setEstadoOcorrencia(e.target.value)}
            value={estadoOcorrencia}
            type="text"
            className="form-control"
            id="estado"
            placeholder="Estado"
          />
        </div>
      </div>
    </div>
  );
}
