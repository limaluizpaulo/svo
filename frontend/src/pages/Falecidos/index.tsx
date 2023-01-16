import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/server";

/* 
{
	"0": {
		"id": 1,
		"nome": "João da Silva",
		"obitoFetal": 0,
		"rgOuRne": "1234",
		"cpf": "123.456.789-01",
		"nomeDoPai": "José da Silva",
		"nomeDaMae": "Maria da Silva",
		"naturalidade": "São Paulo",
		"nacionalidade": "Brasileira",
		"sexo": "Masculino",
		"racaCor": "Branca",
		"dataNascimento": "1998-01-01",
		"idade": 23,
		"estadoCivil": "Solteiro",
		"profissao": "Estudante"
	}
}

*/ 

interface Falecidos {
  id: string;
  nome: string;
  obitoFetal: number;
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

export default function Falecidos() {
  const thead = ["#", "Nome", "Óbito Fetal", "RG ou RNE", "CPF", "Nome do Pai", "Nome da Mãe", "Naturalidade", "Nacionalidade", "Sexo", "Raça/Cor", "Data de Nascimento", "Idade", "Estado Civil", "Profissão", "Ações"];
  const [data, setData] = useState<Falecidos[]>([]);

  async function getData() {

    const result: Falecidos[] = await api(
      `/falecidos`
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
        <h2 className="my-5">Controle</h2>
        <Link to="/add-product">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Pessoa
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
              <td>{data.obitoFetal}</td>
              <td>{data.rgOuRne}</td>
              <td>{data.cpf}</td>
              <td>{data.nomeDoPai}</td>
              <td>{data.nomeDaMae}</td>
              <td>{data.naturalidade}</td>
              <td>{data.nacionalidade}</td>
              <td>{data.sexo}</td>
              <td>{data.racaCor}</td>
              <td>{data.dataNascimento}</td>
              <td>{data.idade}</td>
              <td>{data.estadoCivil}</td>
              <td>{data.profissao}</td>
              

             
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
