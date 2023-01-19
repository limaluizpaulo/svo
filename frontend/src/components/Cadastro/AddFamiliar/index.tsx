import { FormEvent, useEffect, useState } from "react";
import api from "../../../api/server";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface Falecidos {
  nome: string;
  obitoFetal: boolean;
  rgOuRne: string;
  cpf: string;
  nomeDoPai: string;
  nomeDaMae: string;
  naturalidade: string;
  nacionalidade: string;
  sexo: string;
  racaCor: string;
  dataNascimento: string;
  idade: number;
  estadoCivil: string;
  profissao: string;
}

export default function AddFamiliar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rgOuRne, setRgOuRne] = useState("");
  const [nomeDoPai, setNomeDoPai] = useState("");
  const [nomeDaMae, setNomeDaMae] = useState("");
  const [naturalidade, setNaturalidade] = useState("");
  const [nacionalidade, setNacionalidade] = useState("Brasileira");
  const [sexo, setSexo] = useState("");
  const [racaCor, setRacaCor] = useState("naoDeclarada");
  const [dataNascimento, setDataNascimento] = useState("");
  const [idade, setIdade] = useState(0);
  const [estadoCivil, setEstadoCivil] = useState("");
  const [profissao, setProfissao] = useState("");
  const [obitoFetal, setObitoFetal] = useState(false);


  useEffect(() => {
    if (dataNascimento) {
      const data = new Date(dataNascimento);
      const idade = new Date().getFullYear() - data.getFullYear();
      setIdade(idade);
    }
  }, [dataNascimento]);


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (nome && cpf) {
        const dados: Falecidos = {
          nome,
          cpf,
          rgOuRne,
          nomeDoPai,
          nomeDaMae,
          naturalidade,
          nacionalidade,
          sexo,
          racaCor,
          dataNascimento,
          idade,
          estadoCivil,
          profissao,
          obitoFetal,
        }





        /* formData.append("atendente", localStorage.getItem("id")!);*/

        const result = await api("/falecidos", {
          method: "POST",
          body: dados,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")!}`,
          },
        });



        toast.success('Falecido cadastrado com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/ocorrencias");
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
      <h4 className="my-5">Familiar</h4>
      <div className="d-flex justify-content-between align-items-center">
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
          <label htmlFor="exampleFormControlInput2" className="form-label">
            CPF
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
          />
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
            value={rgOuRne}
            onChange={(e) => setRgOuRne(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-around
       align-items-center">

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Data de Nascimento
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput2"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>

        <div className="mb-3
        ">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Idade
          </label>
          <input
            type="number"
            disabled
            className="form-control"
            id="exampleFormControlInput2"
            value={idade}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Naturalidade
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            value={naturalidade}
            onChange={(e) => setNaturalidade(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Nacionalidade
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
          />
        </div>


      </div>
      <div className="d-flex justify-content-around
       align-items-center">
        <div className="mb-3  w-50 p-1">

          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Pai
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            value={nomeDoPai}
            onChange={(e) => setNomeDoPai(e.target.value)}
          />
        </div>

        <div className="mb-3 w-50" >
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Mãe
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            value={nomeDaMae}
            onChange={(e) => setNomeDaMae(e.target.value)}
          />
        </div>
      </div>


      <div className="d-flex justify-content-around
        align-items-center">

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Sexo
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option defaultValue={""}>Selecionar</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino ">Feminino</option>
            <option value="Indefinido">Indefinido</option>
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Estado Civil
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={estadoCivil}
            onChange={(e) => setEstadoCivil(e.target.value)}
          >
            <option defaultValue={""}>Selecionar</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="uniao">União Estável </option>
            <option value="divorciado">Divorciado</option>
            <option value="viuvo">Viúvo</option>
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Profissão
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Raça / Cor
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={racaCor}
            onChange={(e) => setRacaCor(e.target.value)}
          >
            <option defaultValue={""}>Selecionar</option>
            <option value="branca">Branca</option>
            <option value="preta">Preta</option>
            <option value="parda">Parda</option>
            <option value="amarela">Amarela</option>
            <option value="indigena">Indígena</option>
            <option value="naoDeclarada">Não Declarada</option>
          </select>
        </div>
      </div>

      <div>

        <label
          htmlFor="exampleFormControlInput2
  "
          style={{ marginRight: "30px" }}
          className="form-label"
        >
          Obito Fetal?
        </label>
        <input

          type="checkbox"
          style={{ width: "20px", height: "20px" }}
          id="exampleFormControlInput2"
          checked={obitoFetal}
          onChange={(e) => setObitoFetal(!obitoFetal)}
        />

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
