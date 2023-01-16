import React from "react";
import { CadastroProvider } from "../../context/cadastro";
import AddFalecido from "./AddFalecido";
import AddLocal from "./AddLocal";
import SelecioneDP from "./SelecioneDP";

export default function Cadastro() {
  const [step, setStep] = React.useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  function selectComponent() {
    switch (step) {
      case 1:
        return <><SelecioneDP /> <AddLocal /></>;
      case 2:
        return <AddFalecido />;
      case 3:
        return;
      default:
        return 2;
    }
  }

  return (
    <div>
      <CadastroProvider>{selectComponent()}</CadastroProvider>

      <div className="d-flex justify-content-between">
        <button
          disabled={step === 1}
          className="btn btn-primary mb-5"
          onClick={handlePrevStep}
        >
          Voltar
        </button>
        <button className="btn btn-primary mb-5" onClick={handleNextStep}>
          Próximo
        </button>
      </div>
    </div>
  );
}
