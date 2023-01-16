import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";





interface Ocorrencias {
  id: string;
  numeroControle: string;
  ano: string;
  protocolo: string;
  tipoLocal: string;
  numeroBO: string;
  anoBO: string;
  dataHoraChamado: string;
  dataHoraEntrada: string;
  dataHoraLiberacao: string;
  atendente_id: string;
  endereco_id: string;
  delegacia_id: string;
  natureza: string;
  falecido_id: string;
  familiar_id: string;
  motorista_id: string;
  agente_id: string;
  viatura_id: string;
  escrivao_id: string;
  medico_id: string;
}

export default function Ocorrencias() {
  const thead = ["#", "Controle", "Ano", "Protocolo", "Tipo Local", "BO", "Ano BO", "Data Hora Chamado", "Data Hora Entrada", "Data Hora Liberação", "Ações"];
  const [data, setData] = useState<Ocorrencias[]>([]);

  async function getData() {

    const result: Ocorrencias[] = await api(
      `/ocorrencias`
    );
    setData(result.data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function deleteData(id: string) {
    await api(`/falecidos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")!}`,
      },
    });
    alert("Data deleted");
    await getData();
  }

  return (
    <div className="mx-5 px-5">
      <div className="d-flex">
        <h2 className="my-5">Ocorrencia</h2>
        <Link to="/add-ocorrencia">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Ocorrencia
          </button>
        </Link>
      </div>
      <table className="table border">
        <thead>
          <tr>
            {thead.map((data, index) => (
              <th scope="col" key={index}>
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={data.id}>
              <th scope="row">{index + 1}</th>
              <td>{data.numeroControle}</td>
              <td>{data.ano}</td>
              <td>{data.protocolo}</td>
              <td>{data.tipoLocal}</td>
              <td>{data.numeroBO}</td>
              <td>{data.anoBO}</td>
              <td>{data.dataHoraChamado}</td>
              <td>{data.dataHoraEntrada}</td>
              <td>{data.dataHoraLiberacao}</td>

              <td>
                <Link
                  className="text-decoration-none text-primary"
                  to={`/edit-product/${data.id}`}
                >
                  Editar
                </Link>{" "}
                |{" "}
                <span
                  role="button"
                  className="text-danger"
                  onClick={() => deleteData(data.id)}
                >
                  Deletar
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
