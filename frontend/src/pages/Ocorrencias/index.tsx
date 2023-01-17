import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { Link } from "react-router-dom";
import api from "../../api/server";
import moment from 'moment';
import { useSvo } from "../../context/svo";
import { toast } from "react-toastify";

export default function Ocorrencias() {
  const thead = ["Pericia", "Nome", "Chamado", "Status", "Endereço", "BO", "Ações"];
  const { ocorrencias, falecidos, enderecos } = useSvo()
  const [order, setOrder] = useState("asc");

  const o = order === "asc" ? (
    (a, b) => a.numeroControle > b.numeroControle ? -1 : a.numeroControle < b.numeroControle ? 1 : 0) : (
    (a, b) => a.numeroControle < b.numeroControle ? -1 : a.numeroControle > b.numeroControle ? 1 : 0
  )



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
    toast.info("Data deleted");
    // window.location.reload();
  }






  function getStatus(entrada: string, liberacao: string) {
    if (liberacao) {
      return (
        <>
          <button id="liberado" className="btn btn-sm btn-success"  >
            Liberado
          </button>
          <Tooltip anchorId="liberado" variant="info" place="top"
            content={`Liberado dia ${moment(liberacao).format('DD/MM')} às ${moment(liberacao).format('HH:mm')}`} />
        </>
      );
    }

    if (entrada) {
      return (
        <>
          <button id="chegou" className="btn btn-sm btn-primary"  >
            Chegou
          </button>
          <Tooltip anchorId="chegou" variant="info" place="top" content={`Chegou dia ${moment(entrada).format('DD/MM')} às ${moment(entrada).format('HH:mm')}`} />
        </>
      );
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
            <th scope="col" onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
              <i className={`fas fa-sort-${order === "asc" ? "up" : "down"}`}></i>
            </th>
            {thead.map((data, index) => (
              <th scope="col" key={index}>
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ocorrencias.sort(o

          ).
            map((data, index) => (
              <tr key={data.id}>
                <th scope="row">{data.numeroControle}/{data.ano.toString().substring(2)}</th>
                <td>{data.natureza === 1 ? "SVO" : "IML"}</td>
                <td className="text-nowrap">{getFalecido(Number(data.falecido_id))}</td>

                <td>{moment(data.dataHoraChamado).format("DD/MM/YYYY HH:mm")}</td>
                <td>{getStatus(data.dataHoraEntrada, data.dataHoraLiberacao)}</td>

                <td className="text-nowrap
              ">{getEndereco(Number(data.endereco_id))}</td>
                <td>{data.numeroBO}</td>

                <td>
                  <div className=" d-flex justify-content-center
                ">
                    <Link
                      className="btn btn-primary"
                      to={`/edit-product/${data.id}`}
                    >
                      <i className="fas fa-edit"></i>
                    </Link>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(data.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div >
  );
}
