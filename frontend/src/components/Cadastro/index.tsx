import React from "react";
import { useNavigate } from "react-router-dom";
import AddFalecido from "./AddFalecido";
import AddLocal from "./AddLocal";
import SelecioneDP from "./SelecioneDP";
import AddFamiliar from "./AddFamiliar";
import Modal from "../Modal";
import { useSvo } from "../../context/svo";
import Abas from "./Abas";

export default function Cadastro() {
  const [step, setStep] = React.useState(1);

  const { show, setShow } = useSvo()
  const [modalProps, setModalProps] = React.useState({
    id: "modal",
    title: "Aviso",
    children: <div>Deseja sair sem salvar?</div>,
  });

  const navigate = useNavigate();

  const sim = () => {
    navigate('/ocorrencias')
  }

  const nao = () => {
    setShow(false)
  }

  const handleModal = () => {
    setShow(true);
  };

  const button1 = () => {
    return (<button type="button" className="btn btn-secondary" onClick={nao}>
      Não
    </button>)

  }

  const button2 = () => {
    return (
      <button type="button" className="btn btn-primary" onClick={sim}>
        Sim
      </button>
    )
  }



  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>
  ) => {

    // verifica se o usuário rolou para cima ou para baixo
    if (event.deltaY > 0) {
      if (step === 5) return;
      // avança para a próxima etapa
      setStep(step + 1);
    } else {
      if (step === 1) return;
      // volta para a etapa anterior
      setStep(step - 1);
    }
  }



  function selectStep() {
    switch (step) {
      case 1:
        return <><SelecioneDP /> <AddLocal /></>;
      case 2:
        return <AddFalecido />;
      case 3:
        return <AddFamiliar />;
      case 4:
        return <h1>Entrada</h1>;
      case 5:
        return <h1>Liberação</h1>;
      case 6:
        return <h1>Obito Fetal</h1>;
      default:
        return 2;
    }
  }

  return (
    <>
      <div onWheel={handleWheel}>



        {selectStep()}
        <Abas setStep={setStep} step={step} />
      </div>

      { /* <div className="d-flex justify-content-between">
        <button

          className=
          {step !== 1 ? "btn btn-primary mb-5" : "btn btn-danger mb-5"}
          onClick={step !== 1 ? handlePrevStep : () => handleModal()}
        >
          {step !== 1 ? "Voltar" : "Anterior"}
        </button>
        <button className="btn btn-primary mb-5" onClick={handleNextStep}>
          Próximo
        </button>
  </div> */}
      {
        show && (
          <Modal
            id={modalProps.id}
            title={modalProps.title}
            children={modalProps.children}
            setShow={setShow}
            button1={button1}
            button2={button2}
            sim={sim}
            nao={nao}
          />
        )
      }
    </ >
  );
}
