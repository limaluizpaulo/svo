import { useEffect, useState } from "react";
import api from "../../../api/server";
import { useSvo } from "../../../context/svo";

interface DataDelegacias {
  id: string;
  distrito: string;
  endereco_id: string;
}

interface DataNaturezas {
  id: string;
  natureza: string;
}

interface DataEscrivaes {
  id: string;
  nome: string;
  dp: string;
  plantao: string;
}

interface Delegacias {
  data: [DataDelegacias];
}

interface Escrivaes {
  data: [DataEscrivaes];
}

interface Naturezas {
  data: [DataNaturezas]
}

export default function SelecioneDP() {
  const [delegacias, setDelegacias] = useState<DataDelegacias[]>([]);
  const [escrivaes, setEscrivaes] = useState<DataEscrivaes[]>([]);
  const [naturezas, setNaturezas] = useState<DataNaturezas[]>([]);

  const {
    delegaciaSelecionada,
    setDelegaciaSelecionada,
    escrivaoSelecionado,
    setEscrivaoSelecionado,
    ruaDP,
    setRuaDP,
    numeroDP,
    setNumeroDP,
    bairroDP,
    setBairroDP,
    cidadeDP,
    setCidadeDP,
    estadoDP,
    setEstadoDP,
    cepDP,
    setCepDP,
    complementoDP,
    setComplementoDP,
    protocolo,
    numeroDaOcorrencia,
    anoOcorrencia,
    natureza,
    setNatureza,
    boletim,
    setBoletim,
    anoBoletim
  } = useSvo();

  async function getDP() {
    const { data }: Delegacias = await api("/delegacias");
    setDelegacias(data);
  }
  useEffect(() => {
    getDP();
  }, []);

  async function getEscrivaes() {
    const { data }: Escrivaes = await api("/escrivaes");

    setEscrivaes(
      data.filter((escrivaes) => escrivaes.dp === delegaciaSelecionada)
    );
  }

  useEffect(() => {
    getEscrivaes();
  }, [delegaciaSelecionada]);

  async function getNaturezas() {
    const { data }: Naturezas = await api("/naturezas");
    setNaturezas(data);
  }

  useEffect(() => {
    getNaturezas();
  }, []);

  useEffect(() => {
    if (boletim.length === 6) {
      setBoletim(`${boletim}/${anoBoletim}`)
    }
  }, [boletim]);

  return (
    <div className="mx-5 px-5">
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <h3 className="my-4" style={{ color: "#007bff" }
        }>Protocolo : {protocolo} </h3>
        <h3 className="my-4"
          style={{ color: "#222F4D" }}
        >
          {" "}
          Controle: {numeroDaOcorrencia} / {anoOcorrencia}
        </h3>
      </div>

      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <select
            id="dpSelect"
            className="form-select"
            aria-label="Default select example"
            value={delegaciaSelecionada}
            onChange={(e) => setDelegaciaSelecionada(e.target.value)}
          >
            <option defaultValue={""}>Selecionar Delegacia</option>
            {delegacias.map((dp) => (
              <option key={dp.id} value={dp.id}>
                {dp.distrito}
              </option>
            ))}
          </select>
        </div>




        {delegaciaSelecionada !== "" && (
          <>
            <div className="mb-3">
              <select
                id="escrivaoSelect"
                className="form-select"
                aria-label="Default select example"
                value={escrivaoSelecionado}
                onChange={(e) => setEscrivaoSelecionado(e.target.value)}
              >
                <option defaultValue={""}>Selecionar Escrivão</option>
                {escrivaes.map((escrivao) => (
                  <option key={escrivao.id} value={escrivao.id}>
                    {escrivao.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="boletim"
                placeholder="Boletim de Ocorrência"
                value={boletim}
                onChange={(e) => setBoletim(e.target.value)}
              />
            </div>


            <div className="mb-3">
              <select
                required
                id="naturezaSelect"
                className="form-select"
                aria-label="Default select example"
                value={natureza}
                onChange={(e) => setNatureza(e.target.value)}
              >
                <option defaultValue={""}>Selecionar Natureza</option>
                {naturezas.map((natureza) => (
                  <option key={natureza.id} value={natureza.id}>
                    {natureza.natureza}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <hr />
      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <input
            disabled
            onChange={(e) => setCepDP(e.target.value.replace(/\D/g, ""))}
            value={cepDP}
            type="text"
            className="form-control"
            id="cep"
            placeholder="CEP"
          />
        </div>
        <div className="mb-3">
          <input
            disabled
            onChange={(e) => setRuaDP(e.target.value)}
            value={ruaDP}
            type="text"
            className="form-control"
            id="rua"
            placeholder="Rua"
          />
        </div>
        <div className="mb-3">
          <input
            disabled
            onChange={(e) => setNumeroDP(e.target.value)}
            value={numeroDP}
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
            disabled
            type="text"
            className="form-control"
            id="complemento"
            placeholder="Complemento"
            value={complementoDP}
            onChange={(e) => setComplementoDP(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            disabled
            onChange={(e) => setBairroDP(e.target.value)}
            value={bairroDP}
            type="text"
            className="form-control"
            id="bairro"
            placeholder="Bairro"
          />
        </div>
        <div className="mb-3">
          <input
            disabled
            onChange={(e) => setCidadeDP(e.target.value)}
            value={cidadeDP}
            type="text"
            className="form-control"
            id="cidade"
            placeholder="Cidade"
          />
        </div>
        <div className="mb-3">
          <input
            disabled
            onChange={(e) => setEstadoDP(e.target.value)}
            value={estadoDP}
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
