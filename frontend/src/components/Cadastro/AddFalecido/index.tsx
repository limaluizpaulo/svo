import { FormEvent, useEffect, useState } from "react";
import api from "../../../api/server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSvo } from "../../../context/svo";

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

export default function AddFalecido() {
  const navigate = useNavigate();

  const [resideNaOcorrencia, setResideNaOcorrencia] = useState(false);

  const {
    ruaFalecido,
    setRuaFalecido,
    numeroFalecido,
    setNumeroFalecido,
    bairroFalecido,
    setBairroFalecido,
    cidadeFalecido,
    setCidadeFalecido,
    estadoFalecido,
    setEstadoFalecido,
    cepFalecido,
    setCepFalecido,
    complementoFalecido,
    setComplementoFalecido,
    dataOcorrencia,
    cepOcorrencia,
    ruaOcorrencia,
    numeroOcorrencia,
    bairroOcorrencia,
    cidadeOcorrencia,
    estadoOcorrencia,
    complementoOcorrencia,
    obitoFetal,
    setObitoFetal,
    nome,
    setNome,
    cpf,
    setCpf,
    rgOuRne,
    setRgOuRne,
    nomeDoPai,
    setNomeDoPai,
    nomeDaMae,
    setNomeDaMae,
    naturalidade,
    setNaturalidade,
    nacionalidade,
    setNacionalidade,
    sexo,
    setSexo,
    racaCor,
    setRacaCor,
    dataNascimento,
    setDataNascimento,
    idade,
    setIdade,
    estadoCivil,
    setEstadoCivil,
    profissao,
    setProfissao,
  } = useSvo();

  const tiposSexo = [

    {
      "id": "masculino",
      "nome": "Masculino"
    },
    {
      "id": "feminino",
      "nome": "Feminino"
    },
    {
      "id": "indefinido",
      "nome": "Indefinido"
    }
  ]


  async function buscarCepFalecido(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    });

    const data = await response.json();

    setRuaFalecido(data.logradouro);
    setBairroFalecido(data.bairro);
    setCidadeFalecido(data.localidade);
    setEstadoFalecido(data.uf);
  }

  useEffect(() => {
    if (cepFalecido.length === 8) {
      buscarCepFalecido(cepFalecido);
    }
  }, [cepFalecido]);

  function idadeNodiaDoObito(dataNascimento: Date, dataOcorrencia: Date) {
    const idade = dataOcorrencia.getFullYear() - dataNascimento.getFullYear();
    const mes = dataOcorrencia.getMonth() - dataNascimento.getMonth();
    if (
      mes < 0 ||
      (mes === 0 && dataOcorrencia.getDate() < dataNascimento.getDate())
    ) {
      return idade - 1;
    } else {
      return idade;
    }
  }

  useEffect(() => {
    if (dataNascimento && dataOcorrencia) {
      const dataNascimentoFormatada = new Date(dataNascimento);
      const dataOcorrenciaFormatada = new Date(dataOcorrencia);
      const idade = idadeNodiaDoObito(
        dataNascimentoFormatada,
        dataOcorrenciaFormatada
      );
      setIdade(idade);
    }
  }, [dataNascimento]);

  useEffect(() => {
    if (obitoFetal === true) {
      setNome("Natimorto");
      setEstadoCivil("solteiro");
      setNacionalidade("Brasileira");
      setNaturalidade("Guarulhos/SP");
      setProfissao("Sem Profissão");
      setDataNascimento(dataOcorrencia);
    }
  }, [obitoFetal]);

  useEffect(() => {
    if (resideNaOcorrencia) {
      setRuaFalecido(ruaOcorrencia);
      setNumeroFalecido(numeroOcorrencia);
      setBairroFalecido(bairroOcorrencia);
      setCidadeFalecido(cidadeOcorrencia);
      setEstadoFalecido(estadoOcorrencia);
      setCepFalecido(cepOcorrencia);
      setComplementoFalecido(complementoOcorrencia);
    } else {
      setRuaFalecido("");
      setNumeroFalecido("");
      setBairroFalecido("");
      setCidadeFalecido("");
      setEstadoFalecido("");
      setCepFalecido("");
      setComplementoFalecido("");
    }
  }, [resideNaOcorrencia]);

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
        };

        /* formData.append("atendente", localStorage.getItem("id")!);*/

        const result = await api("/falecidos", {
          method: "POST",
          body: dados,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")!}`,
          },
        });

        toast.success("Falecido cadastrado com sucesso!", {
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
        toast.error("Preencha os campos obrigatórios!", {
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
          Obito Fetal?
        </label>
        <input
          type="checkbox"
          id="exampleFormControlInput2"
          checked={obitoFetal}
          onChange={(e) => setObitoFetal(!obitoFetal)}
        />

        <label
          htmlFor="exampleFormControlInput2
        "
          className="form-label obito-fetal-checkbox"
        >
          Reside no Local da Ocorrência?
        </label>
        <input
          type="checkbox"
          id="exampleFormControlInput2"
          checked={resideNaOcorrencia}
          onChange={(e) => setResideNaOcorrencia(!resideNaOcorrencia)}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center pt-3">
        <div className="mb-3  w-75 ">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label  w-75 "
          >
            Nome do Falecido
            <input
              disabled={obitoFetal}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />{" "}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            CPF
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={cpf}
              onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
            />
          </label>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Documento
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={rgOuRne}
              onChange={(e) => setRgOuRne(e.target.value)}
            />{" "}
          </label>
        </div>
      </div>
      <div
        className="d-flex justify-content-around
       align-items-center"
      >
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Data de Nascimento
            <input
              type={obitoFetal ? "datetime-local" : "date"}
              className="form-control"
              id="exampleFormControlInput2"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />{" "}
          </label>
        </div>

        <div
          className="mb-3
        "
        >
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Idade
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput2"
              value={idade}
            />{" "}
          </label>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Naturalidade
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={naturalidade}
              onChange={(e) => setNaturalidade(e.target.value)}
            />{" "}
          </label>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Nacionalidade
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={nacionalidade}
              onChange={(e) => setNacionalidade(e.target.value)}
            />{" "}
          </label>
        </div>
      </div>
      <div
        className="d-flex justify-content-around
       align-items-center"
      >
        <div className="mb-3  w-50 p-1">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label w-100"
          >
            Pai
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={nomeDoPai}
              onChange={(e) => setNomeDoPai(e.target.value)}
            />{" "}
          </label>
        </div>

        <div className="mb-3 w-50">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label w-100"
          >
            Mãe
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={nomeDaMae}
              onChange={(e) => setNomeDaMae(e.target.value)}
            />{" "}
          </label>
        </div>
      </div>

      <div
        className="d-flex justify-content-around
        align-items-center"
      >
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Sexo
            <select
              className="form-select"
              aria-label="Default select example"
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
            >
              <option defaultValue={0}>Selecionar</option>
              {tiposSexo.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>{" "}
          </label>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Estado Civil
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
            </select>{" "}
          </label>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Profissão
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
            />{" "}
          </label>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput2
          "
            className="form-label"
          >
            Raça / Cor
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
            </select>{" "}
          </label>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <input
            onChange={(e) => setCepFalecido(e.target.value.replace(/\D/g, ""))}
            value={cepFalecido}
            type="text"
            className="form-control"
            id="cep"
            placeholder="CEP"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={(e) => setRuaFalecido(e.target.value)}
            value={ruaFalecido}
            type="text"
            className="form-control"
            id="rua"
            placeholder="Rua"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={(e) => setNumeroFalecido(e.target.value)}
            value={numeroFalecido}
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
            value={complementoFalecido}
            onChange={(e) => setComplementoFalecido(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            onChange={(e) => setBairroFalecido(e.target.value)}
            value={bairroFalecido}
            type="text"
            className="form-control"
            id="bairro"
            placeholder="Bairro"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={(e) => setCidadeFalecido(e.target.value)}
            value={cidadeFalecido}
            type="text"
            className="form-control"
            id="cidade"
            placeholder="Cidade"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={(e) => setEstadoFalecido(e.target.value)}
            value={estadoFalecido}
            type="text"
            className="form-control"
            id="estado"
            placeholder="Estado"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="btn btn-primary mb-5"
        >
          Add
        </button>
      </div>
    </div>
  );
}
