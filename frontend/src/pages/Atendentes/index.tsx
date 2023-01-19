import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";
import { toast } from "react-toastify";

/*
{
  "0": {
    "id": 1,
    "nome": "Maria",
    "codigoFuncional": "ATD-02",
    "plantao": "16:00 - 00:00"
  }
}

*/



interface Atendentes {
  id: string;
  nome: string;
  codigoFuncional: string;
  plantao: string;
  email: string;
}

interface AtendentesData {
  data: [Atendentes];
}

export default function Atendentes() {
  const thead = ["#", "Nome", "Email", "Código Funcional", "Plantão", "Ações"];
  const [data, setData] = useState<Atendentes[]>([]);

  async function getData() {
    const { data }: AtendentesData = await api(
      `/users`
    );
    setData(data);
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
        <h2 className="my-5">Atendentes</h2>
        <Link to="/add-product">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Atendente
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
              <td>{data.email}</td>
              <td>{data.codigoFuncional}</td>
              <td>{data.plantao}</td>
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
