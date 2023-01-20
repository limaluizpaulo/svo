import { FormEvent, useEffect, useState } from "react";
import api from "../../../api/server";
import { toast } from 'react-toastify';

interface Familiares {
  nome: string;
  parentesco: string;
  rg: string;
  endereco: string;
  telefone: string;
  celular: string;
  falecido_id: string;
}

export default function AddFamiliar() {

  const [nome, setNome] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [rg, setRg] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [falecido_id, setFalecido_id] = useState("");



  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (nome) {
        const dados: Familiares = {
          nome,
          parentesco,
          rg,
          endereco,
          telefone,
          celular,
          falecido_id,
        }



        /* formData.append("atendente", localStorage.getItem("id")!);*/

        const result = await api("/familiares", {
          method: "POST",
          body: dados,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")!}`,
          },
        });



        toast.success('Familiar cadastrado com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        toast.error('Preencha os campos obrigatórios!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    } catch (e: any) {
      console.log(e.response._data);
    }
  }

  return (
    <div className="mx-5 px-5">

      <div className="d-flex justify-content-between align-items-center pt-3">

        <div className="mb-3 w-100" >
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Nome do Familiar
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput3
          "
            className="form-label"
          >
            Parentesco
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput3"
            value={parentesco}
            onChange={(e) => setParentesco(e.target.value)}
          />
        </div>

      </div>

      <div className="mb-3">
        <label
          htmlFor="exampleFormControlInput2
          "
          className="form-label"
        >
          Documento
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput2"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
        />
      </div>


      <div className="mb-3">
        <label
          htmlFor="exampleFormControlInput4
          "
          className="form-label"
        >
          Telefone
        </label>

        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput4"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="exampleFormControlInput5
          "
          className="form-label"
        >
          Celular
        </label>

        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput5"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />

      </div>










      <div>



      </div>
      <div className="d-flex justify-content-end">
        <button

          onClick={(e) => { handleSubmit(e) }}
          className="btn btn-primary mb-5"

        >
          Add
        </button>
      </div>

    </div>
  );
}
