import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";
import { toast } from "react-toastify";
import { useSvo } from "../../context/svo";

/*
{
  "0": {
    "id": 1,
    "numeroControle": "00001",
    "ano": 2021,
    "dataEmissao": "2021-01-01",
    "ocorrencia_id": null,
    "numeroDO": "3535353501-1"
  }
}

*/



interface Declaracoes {
  id: string;
  numeroControle: string;
  ano: number;
  dataEmissao: string;
  ocorrencia_id: string;
  numeroDO: string;
}

export default function Declaracoes() {
  const thead = ["#", "Número de Controle", "Ano", "Data de Emissão", "Ocorrência", "Número da DO", "Ações"];
  const [data, setData] = useState<Declaracoes[]>([]);
  const { falecidos } = useSvo();

  async function getData() {

    const result: Declaracoes[] = await api(
      `/declaracoes`
    );
    setData(result.data);
  }

  function getFalecido(id: number) {
    const falecido = falecidos.find((falecido) => falecido.id === id);
    return falecido?.nome;
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
    toast.info("Data deleted");
    await getData();
  }

  return (
    <div className="mx-5 px-5">
      <div className="d-flex">
        <h2 className="my-5">Declarações</h2>
        <Link to="/add-product">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Declaração
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
              <td>{data.dataEmissao}</td>
              <td>{getFalecido(Number(data.ocorrencia_id))}</td>
              <td>{data.numeroDO}</td>



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
    </div>
  );
}
