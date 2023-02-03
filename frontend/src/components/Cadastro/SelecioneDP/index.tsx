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


      <div className="d-flex justify-content-between my-4">

        <div className="mb-3">
          <label className="form-label">
            Delegacia
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
          </label>
        </div>




        {delegaciaSelecionada !== "" && (
          <>
            <div className="mb-3">
              <label className="form-label">
                Escrivão
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
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Boletim de Ocorrência
                <input
                  type="text"
                  className="form-control"
                  id="boletim"
                  placeholder="Boletim de Ocorrência"
                  value={boletim}
                  onChange={(e) => setBoletim(e.target.value)}
                />
              </label>
            </div>


            <div className="mb-3">
              <label className="form-label">
                Natureza
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
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
