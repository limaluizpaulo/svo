import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";
import moment from 'moment';
import { useCadastro } from "../../context/cadastro";


export default function Ocorrencias() {
  const thead = ["#", "IML", "Nome", "BO", "Chamado", "Status", "Endereço", "Ações"];
  const { ocorrencias, falecidos, enderecos } = useCadastro()

  function getFalecido(id: number) {
    const falecido = falecidos.find((falecido) => falecido.id === id);
    return falecido?.nome;
  }

  function getEndereco(id: number) {
    const endereco = enderecos.find((endereco) => endereco.id === id);
    return `${endereco?.rua}, ${endereco?.numero} - ${endereco?.bairro} - ${endereco?.cidade}/${endereco?.estado}`;
  }

  async function deleteData(id: string) {
    await api(`/falecidos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")!}`,
      },
    });
    alert("Data deleted");
    // window.location.reload();
  }

  function getStatus(entrada: string, liberacao: string) {
    if (entrada) {
      return <button className="btn btn-sm btn-primary"
        title={`Chegou dia ${moment(entrada).format("DD/MM")}
      às ${moment(entrada).format("HH:mm")}`}
      >Chegou</button>;
    } else if (liberacao) {
      return <button
        title={`Liberado dia ${moment(liberacao).format("DD/MM")}
      às ${moment(liberacao).format("HH:mm")}`}
        className="btn btn-sm btn-success">Liberado</button>;
    } else {
      return <button className="btn btn-sm btn-warning">Não Chegou</button>;
    }
  }

  return (
    <div className="mx-5 px-5">
      <div className="d-flex">
        <h2 className="my-5">Diário</h2>
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
          {ocorrencias.map((data, index) => (
            <tr key={data.id}>
              <th scope="row">{data.numeroControle}/{data.ano.toString().substring(2)}</th>
              <td>{data.natureza === 1 ? "SVO" : "IML"}</td>
              <td className="text-nowrap">{getFalecido(Number(data.falecido_id))}</td>
              <td>{data.numeroBO}</td>
              <td>{moment(data.dataHoraChamado).format("DD/MM/YYYY HH:mm")}</td>
              <td>{getStatus(data.dataHoraEntrada, data.dataHoraLiberacao)}</td>

              <td className="text-nowrap
              ">{getEndereco(Number(data.endereco_id))}</td>

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
