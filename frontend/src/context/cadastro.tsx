import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";
import api from "../api/server";

interface CadastroContextData {
    tipoLocal: number;
    setTipoLocal: (tipoLocal: number) => void;
    hospital: number;
    setHospital: (hospital: number) => void;
    delegaciaSelecionada: string;
    setDelegaciaSelecionada: (delegaciaSelecionada: string) => void;
    escrivaoSelecionado: string;
    setEscrivaoSelecionado: (escrivaoSelecionado: string) => void;
    cepOcorrencia: string;
    setCepOcorrencia: (cepOcorrencia: string) => void;
    ruaOcorrencia: string;
    setRuaOcorrencia: (ruaOcorrencia: string) => void;
    numeroOcorrencia: string;
    setNumeroOcorrencia: (numeroOcorrencia: string) => void;
    bairroOcorrencia: string;
    setBairroOcorrencia: (bairroOcorrencia: string) => void;
    cidadeOcorrencia: string;
    setCidadeOcorrencia: (cidadeOcorrencia: string) => void;
    estadoOcorrencia: string;
    setEstadoOcorrencia: (estadoOcorrencia: string) => void;
    complementoOcorrencia: string;
    setComplementoOcorrencia: (complementoOcorrencia: string) => void;
    ruaDP: string;
    setRuaDP: (ruaDP: string) => void;
    numeroDP: string;
    setNumeroDP: (numeroDP: string) => void;
    bairroDP: string;
    setBairroDP: (bairroDP: string) => void;
    cidadeDP: string;
    setCidadeDP: (cidadeDP: string) => void;
    estadoDP: string;
    setEstadoDP: (estadoDP: string) => void;
    complementoDP: string;
    setComplementoDP: (complementoDP: string) => void;
    cepDP: string;
    setCepDP: (cepDP: string) => void;
    ocorrencias: any;
    setOcorrencias: (ocorrencias: any) => void;
    protocolo: number;
    setProtocolo: (protocolo: number) => void;
    ruaFalecido: string;
    setRuaFalecido: (ruaFalecido: string) => void;
    numeroFalecido: string;
    setNumeroFalecido: (numeroFalecido: string) => void;
    bairroFalecido: string;
    setBairroFalecido: (bairroFalecido: string) => void;
    cidadeFalecido: string;
    setCidadeFalecido: (cidadeFalecido: string) => void;
    estadoFalecido: string;
    setEstadoFalecido: (estadoFalecido: string) => void;
    complementoFalecido: string;
    setComplementoFalecido: (complementoFalecido: string) => void;
    cepFalecido: string;
    setCepFalecido: (cepFalecido: string) => void;
    numeroDaOcorrencia: number;
    setNumeroDaOcorrencia: (numeroDaOcorrencia: number) => void;
    anoOcorrencia: number;
    setAnoOcorrencia: (anoOcorrencia: number) => void;
    dataOcorrencia: string;
    setDataOcorrencia: (dataOcorrencia: string) => void;
    natureza: string;
    setNatureza: (natureza: string) => void;
}


interface CadastroProviderProps {
    children: ReactNode;
}

const CadastroContext = createContext({} as CadastroContextData);

export function CadastroProvider({ children }: CadastroProviderProps) {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [protocolo, setProtocolo] = useState(0);
    const [numeroDaOcorrencia, setNumeroDaOcorrencia] = useState(0);
    const [dataOcorrencia, setDataOcorrencia] = useState("");
    const [natureza, setNatureza] = useState("");
    // ano atual
    const [anoOcorrencia, setAnoOcorrencia] = useState(0);

    const [tipoLocal, setTipoLocal] = useState(0);
    const [hospital, setHospital] = useState(0);
    const [delegaciaSelecionada, setDelegaciaSelecionada] = useState("");
    const [escrivaoSelecionado, setEscrivaoSelecionado] = useState("");
    const [cepOcorrencia, setCepOcorrencia] = useState("");
    const [ruaOcorrencia, setRuaOcorrencia] = useState("");
    const [numeroOcorrencia, setNumeroOcorrencia] = useState("");
    const [bairroOcorrencia, setBairroOcorrencia] = useState("");
    const [cidadeOcorrencia, setCidadeOcorrencia] = useState("");
    const [estadoOcorrencia, setEstadoOcorrencia] = useState("");
    const [complementoOcorrencia, setComplementoOcorrencia] = useState("");
    const [ruaDP, setRuaDP] = useState("");
    const [numeroDP, setNumeroDP] = useState("");
    const [bairroDP, setBairroDP] = useState("");
    const [cidadeDP, setCidadeDP] = useState("");
    const [estadoDP, setEstadoDP] = useState("");
    const [cepDP, setCepDP] = useState("");
    const [complementoDP, setComplementoDP] = useState("");
    const [ruaFalecido, setRuaFalecido] = useState("");
    const [numeroFalecido, setNumeroFalecido] = useState("");
    const [bairroFalecido, setBairroFalecido] = useState("");
    const [cidadeFalecido, setCidadeFalecido] = useState("");
    const [estadoFalecido, setEstadoFalecido] = useState("");
    const [cepFalecido, setCepFalecido] = useState("");
    const [complementoFalecido, setComplementoFalecido] = useState("");

    async function getEndereço(id: number) {
        const { data } = await api(`/enderecos/${id}`);

        setRuaOcorrencia(data.rua);
        setBairroOcorrencia(data.bairro);
        setNumeroOcorrencia(data.numero);
        setCidadeOcorrencia(data.cidade);
        setEstadoOcorrencia(data.estado);
        setCepOcorrencia(data.cep);
    }

    async function getEndereçoDP(id: number) {
        const { data } = await api(`/enderecos/${id}`);

        setRuaDP(data.rua);
        setBairroDP(data.bairro);
        setNumeroDP(data.numero);
        setCidadeDP(data.cidade);
        setEstadoDP(data.estado);
        setCepDP(data.cep);
        setComplementoDP(data.complemento);
    }

    async function getEndereçoFalecido(id: number) {
        const { data } = await api(`/enderecos/${id}`);

        setRuaFalecido(data.rua);
        setBairroFalecido(data.bairro);
        setNumeroFalecido(data.numero);
        setCidadeFalecido(data.cidade);
        setEstadoFalecido(data.estado);
        setCepFalecido(data.cep);
        setComplementoFalecido(data.complemento);
    }

    async function getOcorrencias() {
        const { data } = await api("/ocorrencias");
        setOcorrencias(data);
    }

    function getProtocolo() {
        setProtocolo(ocorrencias.length + 1);
    }

    function getNumeroDaOcorrencia() {
        setNumeroDaOcorrencia(ocorrencias.length + 1);
        setAnoOcorrencia(new Date().getFullYear());
    }

    useEffect(() => {
        getOcorrencias();
    }, []);

    useEffect(() => {
        getProtocolo();
        getNumeroDaOcorrencia();
    }, [ocorrencias]);

    useEffect(() => {
        if (hospital !== 0) {
            getEndereço(hospital);
        }
    }, [hospital]);

    useEffect(() => {
        if (delegaciaSelecionada !== "") {
            getEndereçoDP(Number(delegaciaSelecionada));
        }
    }, [delegaciaSelecionada]);

    useEffect(() => {
        if (tipoLocal === 1) {
            getEndereçoFalecido(tipoLocal);
        }
    }, [tipoLocal]);

    return (
        <CadastroContext.Provider
            value={{
                tipoLocal,
                setTipoLocal,
                hospital,
                setHospital,
                delegaciaSelecionada,
                setDelegaciaSelecionada,
                escrivaoSelecionado,
                setEscrivaoSelecionado,
                cepOcorrencia,
                setCepOcorrencia,
                ruaOcorrencia,
                setRuaOcorrencia,
                numeroOcorrencia,
                setNumeroOcorrencia,
                bairroOcorrencia,
                setBairroOcorrencia,
                cidadeOcorrencia,
                setCidadeOcorrencia,
                estadoOcorrencia,
                setEstadoOcorrencia,
                complementoOcorrencia,
                setComplementoOcorrencia,
                ruaDP,
                setRuaDP,
                numeroDP,
                setNumeroDP,
                bairroDP,
                setBairroDP,
                cidadeDP,
                setCidadeDP,
                estadoDP,
                setEstadoDP,
                cepDP,
                setCepDP,
                complementoDP,
                setComplementoDP,
                ocorrencias,
                protocolo,
                setProtocolo,
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
                numeroDaOcorrencia,
                anoOcorrencia,
                dataOcorrencia,
                setDataOcorrencia,
                natureza,
                setNatureza,
            }}
        >
            {children}
        </CadastroContext.Provider>
    );
}

export function useCadastro() {
    const context = useContext(CadastroContext);
    return context;
}
