import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { Link } from "react-router-dom";
import api from "../../api/server";
import moment from 'moment';
import { useSvo } from "../../context/svo";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";

export default function Ocorrencias() {
  const thead = ["IML", "Nome", "Chamado", "Status", "Endereço", "BO", "Ações"];
  const { ocorrencias, falecidos, enderecos, show, setShow } = useSvo()
  const [order, setOrder] = useState("asc");
  const [pagina, setPagina] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [ocorrenciasPagina, setOcorrenciasPagina] = useState([]);
  const [modalProps, setModalProps] = useState({
    id: "modal",
    title: "Receber falecido",
    children: <div>Entrada</div>,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await api(`/ocorrencias?pagina=${pagina}&itensPorPagina=${itensPorPagina}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")!}`,
        },
      });
      setOcorrenciasPagina(response.data);
    }
    fetchData();
  }, [pagina, itensPorPagina]);

  const o = order === "asc" ? (
    (a: any
      , b: any) => a.numeroControle > b.numeroControle ? -1 : a.numeroControle < b.numeroControle ? 1 : 0) : (
    (a: any
      , b: any) => a.numeroControle < b.numeroControle ? -1 : a.numeroControle > b.numeroControle ? 1 : 0
  )

  const button1 = () => {
    return (<button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
      Não
    </button>)

  }

  const button2 = () => {
    return (
      <button type="button" className="btn btn-primary" onClick={() => alert("salve")}>
        Sim
      </button>
    )
  }

  function getFalecido(id: number) {
    const falecido = falecidos.find((falecido) => falecido.id === id);
    return falecido?.nome;
  }

  function getEndereco(id: number) {
    const endereco = enderecos.find((endereco) => endereco.id === id);
    return `${endereco?.rua}, ${endereco?.numero} - ${endereco?.bairro} - ${endereco?.cidade}/${endereco?.estado}`;
  }

  async function deleteData(id: string) {
    await api(`/falecidos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")!}`,
      },
    });

    toast.info("Data deleted");
  }

  function liberar() {
    setModalProps({
      id: "modal",
      title: "Liberar falecido?",
      children: <div>Entrada</div>,
    })
    setShow(true)
  }

  function receber() {
    setModalProps({
      id: "modal",
      title: "Receber falecido?",
      children: <div>Entrada</div>,
    })
    setShow(true)

  }

  function cancelar() {
    setModalProps({
      id: "modal",
      title: "Cancelar Liberação?",
      children: <div>Entrada</div>,
    })
    setShow(true)

  }

  function getStatus(entrada: string, liberacao: string) {
    if (liberacao) {
      return (
        <>
          <button id="liberado" className="btn btn-sm btn-success" onClick={cancelar} >
            Liberado
          </button>
          <Tooltip anchorId="liberado" variant="info" place="top"
            content={`Liberado dia ${moment(liberacao).format('DD/MM')} às ${moment(liberacao).format('HH:mm')}`} />
        </>
      );
    }

    if (entrada) {
      return (
        <>
          <button id="chegou" className="btn btn-sm btn-primary" onClick={liberar} >
            Chegou
          </button>
          <Tooltip anchorId="chegou" variant="info" place="top" content={`Chegou dia ${moment(entrada).format('DD/MM')} às ${moment(entrada).format('HH:mm')}`} />
        </>
      );
    } else {
      return (
        <>
          <button id="naochegou" onClick={receber} className="btn btn-sm btn-warning">Não Chegou</button>
          <Tooltip anchorId="naochegou" variant="info" place="top" content={`Não Chegou`} /></>
      )
    }
  }

  return (
    <div className="mx-5 px-5">
      <div className="d-flex">
        <h2 className="my-5">Diário</h2>
        <Link to="/add-ocorrencia">
          <button className="btn btn-sm btn-primary my-5 ms-3 fw-bold">
            Adicionar Ocorrencia
          </button>
        </Link>
      </div>
      <table className="table border">
        <thead>
          <tr>
            <th scope="col" onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
              <i className={`fas fa-sort-${order === "asc" ? "up" : "down"}`}></i>
            </th>
            {thead.map((data, index) => (
              <th scope="col" key={index}>
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ocorrencias.sort(o

          ).
            map((data, index) => (
              <tr key={data.id}>
                <th scope="row">{data.numeroControle}/{data.ano.toString().substring(2)}</th>
                <td>{data.natureza === 1 ? "SVO" : "IML"}</td>
                <td className="text-nowrap">{getFalecido(Number(data.falecido_id))}</td>

                <td>{moment(data.dataHoraChamado).format("DD/MM/YYYY HH:mm")}</td>
                <td>{getStatus(data.dataHoraEntrada, data.dataHoraLiberacao)}</td>

                <td className="text-nowrap
              ">{getEndereco(Number(data.endereco_id))}</td>
                <td>{data.numeroBO}</td>

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

      <div

        className="d-flex justify-content-end">
        Itens por página:
        <select
          // deixar do tamanho da lista de opções
          className="form-select form-select-sm w-25 mx-2 "
          value={itensPorPagina} onChange={(e) => setItensPorPagina(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <div className="d-flex">
          <button
            className="btn btn-sm btn-primary"
            disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
          <span
            className="btn btn-sm btn-light mx-2"
          >{pagina}</span>
          <button

            className="btn btn-sm btn-primary"
            disabled={ocorrenciasPagina.length < itensPorPagina} onClick={() => setPagina(pagina + 1)}>Próxima</button>
        </div>
      </div>
      {
        show && (
          <Modal
            id={modalProps.id}
            title={modalProps.title}
            children={modalProps.children}
            setShow={setShow}
            button1={button1}
            button2={button2}
          />
        )
      }

    </div >
  );
}
