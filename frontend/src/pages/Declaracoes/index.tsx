import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";

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

  async function getData() {

    const result: Declaracoes[] = await api(
      `/declaracoes`
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
              <td>{data.ocorrencia_id}</td>
              <td>{data.numeroDO}</td>
              
            

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
