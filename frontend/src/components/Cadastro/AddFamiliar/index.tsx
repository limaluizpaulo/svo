import { FormEvent, useEffect, useState } from "react";
import api from "../../../api/server";
import { toast } from 'react-toastify';
import { useSvo } from "../../../context/svo";

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
  const [resideComOFalecido, setResideComOFalecido] = useState(false);

  const { ruaFamiliar,
    setRuaFamiliar,
    numeroFamiliar,
    setNumeroFamiliar,
    bairroFamiliar,
    setBairroFamiliar,
    cidadeFamiliar,
    setCidadeFamiliar,
    estadoFamiliar,
    setEstadoFamiliar,
    cepFamiliar,
    setCepFamiliar,
    complementoFamiliar,
    setComplementoFamiliar,
    cepFalecido,
    ruaFalecido,
    numeroFalecido,
    bairroFalecido,
    cidadeFalecido,
    estadoFalecido,
    complementoFalecido,
  } = useSvo();


  async function buscarCepFamiliar(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    });

    const data = await response.json();

    setRuaFamiliar(data.logradouro);
    setBairroFamiliar(data.bairro);
    setCidadeFamiliar(data.localidade);
    setEstadoFamiliar(data.uf);
  }


  useEffect(() => {
    if (cepFamiliar.length === 8) {
      buscarCepFamiliar(cepFamiliar);
    }
  }, [cepFamiliar]);

  useEffect(() => {
    if (resideComOFalecido) {
      setRuaFamiliar(ruaFalecido);
      setNumeroFamiliar(numeroFalecido);
      setBairroFamiliar(bairroFalecido);
      setCidadeFamiliar(cidadeFalecido);
      setEstadoFamiliar(estadoFalecido);
      setCepFamiliar(cepFalecido);
      setComplementoFamiliar(complementoFalecido);
    } else {
      setRuaFamiliar("");
      setNumeroFamiliar("");
      setBairroFamiliar("");
      setCidadeFamiliar("");
      setEstadoFamiliar("");
      setCepFamiliar("");
      setComplementoFamiliar("");
    }
  }, [resideComOFalecido]);



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

      <div className="d-flex jalign-items-center pt-3">
        <label
          htmlFor="exampleFormControlInput2
        "
          className="form-label obito-fetal-checkbox"
        >
          Reside com o falecido?
        </label>
        <input
          type="checkbox"
          id="exampleFormControlInput2"
          checked={resideComOFalecido}
          onChange={(e) => setResideComOFalecido(!resideComOFalecido)}
        />
      </div>

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

      <hr />
      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <input

            onChange={(e) => setCepFamiliar(e.target.value.replace(/\D/g, ""))}
            value={cepFamiliar}
            type="text"
            className="form-control"
            id="cep"
            placeholder="CEP"
          />
        </div>
        <div className="mb-3">
          <input

            onChange={(e) => setRuaFamiliar(e.target.value)}
            value={ruaFamiliar}
            type="text"
            className="form-control"
            id="rua"
            placeholder="Rua"
          />
        </div>
        <div className="mb-3">
          <input

            onChange={(e) => setNumeroFamiliar(e.target.value)}
            value={numeroFamiliar}
            type="text"
            className="form-control"
            id="numero"
            placeholder="Numero"
          />
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <input

            type="text"
            className="form-control"
            id="complemento"
            placeholder="Complemento"
            value={complementoFamiliar}
            onChange={(e) => setComplementoFamiliar(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input

            onChange={(e) => setBairroFamiliar(e.target.value)}
            value={bairroFamiliar}
            type="text"
            className="form-control"
            id="bairro"
            placeholder="Bairro"
          />
        </div>
        <div className="mb-3">
          <input

            onChange={(e) => setCidadeFamiliar(e.target.value)}
            value={cidadeFamiliar}
            type="text"
            className="form-control"
            id="cidade"
            placeholder="Cidade"
          />
        </div>
        <div className="mb-3">
          <input

            onChange={(e) => setEstadoFamiliar(e.target.value)}
            value={estadoFamiliar}
            type="text"
            className="form-control"
            id="estado"
            placeholder="Estado"
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
