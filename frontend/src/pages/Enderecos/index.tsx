import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";
import { useSvo } from "../../context/svo";
import { toast } from "react-toastify";

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



export default function Enderecos() {
  const thead = ["#", "Rua", "Número", "Bairro", "Cidade", "Estado", "Complemento", "Ações"];
  const { enderecos } = useSvo()





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
          {enderecos.map((data, index) => (
            <tr key={data.id}>
              <th scope="row">{index + 1}</th>
              <td>{data.rua}</td>
              <td>{data.numero}</td>
              <td>{data.bairro}</td>
              <td>{data.cidade}</td>
              <td>{data.estado}</td>
              <td>{data.complemento}</td>





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
