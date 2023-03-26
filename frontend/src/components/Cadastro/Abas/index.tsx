import { useSvo } from "../../../context/svo"



const Abas = (props: any) => {
    const { setStep, step } = props;
    const { obitoFetal } = useSvo()
    return (
        <div className="row abas">
            <div className="col-12">
                <div className="d-flex justify-content-between">
                    <button className={`  ${step === 1 ? 'aba-button-active' : 'abas-button'}`}
                        onClick={() => setStep(1)}>Ocorrência</button>
                    <button className={`  ${step === 2 ? 'aba-button-active' : 'abas-button'}`} onClick={() => setStep(2)}>{obitoFetal ? "Natimorto" : "Falecido"}</button>
                    {obitoFetal && <button className={`  ${step === 6 ? 'aba-button-active' : 'abas-button'}`} onClick={() => setStep(6)}>Mãe</button>}
                    <button className={`  ${step === 3 ? 'aba-button-active' : 'abas-button'}`} onClick={() => setStep(3)}>Familiar</button>
                    <button className={`  ${step === 4 ? 'aba-button-active' : 'abas-button'}`} onClick={() => setStep(4)}>Entrada</button>
                    <button className={`  ${step === 5 ? 'aba-button-active' : 'abas-button'}`} onClick={() => setStep(5)}>Liberação</button>
                </div>
            </div>
        </div>
    )
}

export default Abas


