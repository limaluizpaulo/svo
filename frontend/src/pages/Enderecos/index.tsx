import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";

/* 
{
	"0": {
		"id": 1,
		"rua": "Avenida Paulista",
		"numero": 1374,
		"bairro": "Bela Vista",
		"cidade": "São Paulo",
		"estado": "SP",
		"complemento": "Edifício Itália"
	}
}
*/ 

interface Enderecos {
  id: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;

}

export default function Enderecos() {
  const thead = ["#", "Rua", "Número", "Bairro", "Cidade", "Estado", "Complemento", "Ações"];
  const [data, setData] = useState<Enderecos[]>([]);

  async function getData() {

    const result: Enderecos[] = await api(
      `/enderecos`
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
        <h2 className="my-5">Endereços</h2>
        <Link to="/add-product">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Endereço
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
              <td>{data.rua}</td>
              <td>{data.numero}</td>
              <td>{data.bairro}</td>
              <td>{data.cidade}</td>
              <td>{data.estado}</td>
              <td>{data.complemento}</td>
              
           
              

             
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
