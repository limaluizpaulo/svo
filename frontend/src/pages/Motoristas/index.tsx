import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";

/*

{
	"0": {
		"id": 1,
		"nome": "João da Silva",
		"telefone": "11 9999-8888",
		"plantao": "Diurno"
	}
}

*/



interface Motoristas {
  id: string;
  nome: string;
  telefone : string;
  plantao: string;

}

export default function Motoristas() {
  const thead = ["#", "Nome", "Telefone", "Plantão", "Ações"];
  const [data, setData] = useState<Motoristas[]>([]);

  async function getData() {

    const result: Motoristas[] = await api(
      `/motoristas`
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
        <h2 className="my-5">Motoristas</h2>
        <Link to="/add-product">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Motorista
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
              <td>{data.nome}</td>
              <td>{data.telefone}</td>
              <td>{data.plantao}</td>
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