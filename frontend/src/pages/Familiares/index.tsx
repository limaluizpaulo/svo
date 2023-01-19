import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";
import { toast } from "react-toastify";

/*
-- Criação da tabela familiares
CREATE TABLE familiares (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    parentesco VARCHAR(50),
    rg VARCHAR(20),
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    celular VARCHAR(20),
    falecido_id INTEGER,
    FOREIGN KEY (falecido_id) REFERENCES falecidos(id)
);

*/



interface Familiares {
  id: string;
  nome: string;
  telefone: string;
  parentesco: string;
  rg: string;
  endereco: string;
  celular: string;
  falecido_id: string;
}

export default function Familiares() {
  const thead = ["#", "Nome", "Telefone", "Parentesco", "RG", "Endereço", "Celular", "Ações"];
  const [data, setData] = useState<Familiares[]>([]);

  async function getData() {

    const result: Familiares[] = await api(
      `/familiares`
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
        <h2 className="my-5">Familiares</h2>
        <Link to="/add-product">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Familiar
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
              <td>{data.parentesco}</td>
              <td>{data.rg}</td>
              <td>{data.endereco}</td>
              <td>{data.celular}</td>

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
