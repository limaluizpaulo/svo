import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";
import { toast } from "react-toastify";

/*
{
  "data": [
    {
      "id": 1,
      "distrito": "01DP",
      "endereco_id": 1
    },
    {
      "id": 2,
      "distrito": "02DP",
      "endereco_id": 2
    },
    {
      "id": 3,
      "distrito": "03DP",
      "endereco_id": 3
    },
    {
      "id": 4,
      "distrito": "04DP",
      "endereco_id": 4
    },
    {
      "id": 5,
      "distrito": "05DP",
      "endereco_id": 5
    }
  ]
}

*/



interface Delegacias {
  id: string;
  distrito: string;
  endereco_id: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;
}

export default function Delegacias() {
  const thead = ["#", "Distrito", "Endereço", "Telefone 1", "Telefone 2", "Telefone 3", "Ações"];
  const [data, setData] = useState<Delegacias[]>([]);

  async function getData() {

    const result: Delegacias[] = await api(
      `/delegacias`
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
    toast.info("Data deleted");
    await getData();
  }

  return (
    <div className="mx-5 px-5">
      <div className="d-flex">
        <h2 className="my-5">Delegacias</h2>
        <Link to="/add-product">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Delegacia
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
              <td>{data.distrito}</td>
              <td>{data.endereco_id}</td>
              <td>{data.telefone1}</td>
              <td>{data.telefone2}</td>
              <td>{data.telefone3}</td>
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
