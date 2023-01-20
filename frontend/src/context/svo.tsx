import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";
import api from "../api/server";

interface Ocorrencias {
    id: string;
    numeroControle: string;
    ano: string;
    protocolo: string;
    tipoLocal: string;
    numeroBO: string;
    anoBO: string;
    dataHoraChamado: string;
    dataHoraEntrada: string;
    dataHoraLiberacao: string;
    atendente_id: string;
    endereco_id: string;
    delegacia_id: string;
    natureza: number;
    falecido_id: string;
    familiar_id: string;
    motorista_id: string;
    agente_id: string;
    viatura_id: string;
    escrivao_id: string;
    medico_id: string;
}

interface Falecidos {
    id: number;
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

interface OcorrenciasData {
    data: [Ocorrencias]
}

interface FalecidosData {
    data: [Falecidos]
}

interface Enderecos {
    id: number;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento: string;

}

interface EnderecosData {
    data: [Enderecos];
}

interface SvoContextData {
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
    ocorrencias: Array<Ocorrencias>;
    setOcorrencias: (ocorrencias: Array<Ocorrencias>) => void;
    falecidos: Array<Falecidos>;
    setFalecidos: (falecidos: Array<Falecidos>) => void;
    enderecos: Array<Enderecos>;
    setEnderecos: (enderecos: Array<Enderecos>) => void;
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
    ruaFamiliar: string;
    setRuaFamiliar: (ruaFamiliar: string) => void;
    numeroFamiliar: string;
    setNumeroFamiliar: (numeroFamiliar: string) => void;
    bairroFamiliar: string;
    setBairroFamiliar: (bairroFamiliar: string) => void;
    cidadeFamiliar: string;
    setCidadeFamiliar: (cidadeFamiliar: string) => void;
    estadoFamiliar: string;
    setEstadoFamiliar: (estadoFamiliar: string) => void;
    complementoFamiliar: string;
    setComplementoFamiliar: (complementoFamiliar: string) => void;
    cepFamiliar: string;
    setCepFamiliar: (cepFamiliar: string) => void;
    numeroDaOcorrencia: string;
    setNumeroDaOcorrencia: (numeroDaOcorrencia: string) => void;
    anoOcorrencia: number;
    setAnoOcorrencia: (anoOcorrencia: number) => void;
    dataOcorrencia: string;
    setDataOcorrencia: (dataOcorrencia: string) => void;
    natureza: string;
    setNatureza: (natureza: string) => void;
    boletim: string;
    setBoletim: (boletim: string) => void;
    anoBoletim: number;
    setAnoBoletim: (anoBoletim: number) => void;
    show: boolean;
    setShow: (show: boolean) => void;
    selectedId: number;
    setSelectedId: (seletedId: number) => void;


}


interface SvoProviderProps {
    children: ReactNode;
}

const SvoContext = createContext({} as SvoContextData);

export function SvoProvider({ children }: SvoProviderProps) {
    // objeto com dados da ocorrencia
    const [ocorrencias, setOcorrencias] = useState<any>([]);
    // objeto com dados do endereço da ocorrencia
    const [enderecos, setEnderecos] = useState<Enderecos[]>([]);
    // objeto com dados do falecido
    const [falecidos, setFalecidos] = useState<Falecidos[]>([]);

    // dados da ocorrencia
    // string com o numero do protocolo
    const [protocolo, setProtocolo] = useState(0);
    const [numeroDaOcorrencia, setNumeroDaOcorrencia] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState("");
    const [natureza, setNatureza] = useState("");
    const [boletim, setBoletim] = useState("");
    const [anoBoletim, setAnoBoletim] = useState(0);
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

    // dados da delegacia
    const [ruaDP, setRuaDP] = useState("");
    const [numeroDP, setNumeroDP] = useState("");
    const [bairroDP, setBairroDP] = useState("");
    const [cidadeDP, setCidadeDP] = useState("");
    const [estadoDP, setEstadoDP] = useState("");
    const [cepDP, setCepDP] = useState("");
    const [complementoDP, setComplementoDP] = useState("");

    // dados do falecido
    const [ruaFalecido, setRuaFalecido] = useState("");
    const [numeroFalecido, setNumeroFalecido] = useState("");
    const [bairroFalecido, setBairroFalecido] = useState("");
    const [cidadeFalecido, setCidadeFalecido] = useState("");
    const [estadoFalecido, setEstadoFalecido] = useState("");
    const [cepFalecido, setCepFalecido] = useState("");
    const [complementoFalecido, setComplementoFalecido] = useState("");

    // dados do familiar
    const [ruaFamiliar, setRuaFamiliar] = useState("");
    const [numeroFamiliar, setNumeroFamiliar] = useState("");
    const [bairroFamiliar, setBairroFamiliar] = useState("");
    const [cidadeFamiliar, setCidadeFamiliar] = useState("");
    const [estadoFamiliar, setEstadoFamiliar] = useState("");
    const [cepFamiliar, setCepFamiliar] = useState("");
    const [complementoFamiliar, setComplementoFamiliar] = useState("");


    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<Ocorrencias>({} as Ocorrencias);

    function getOcorrencia(selectedId: number) {
        const ocorrencia = ocorrencias.find((ocorrencia: any) => ocorrencia.id === selectedId);
        setOcorrenciaSelecionada(ocorrencia);
    }

    useEffect(() => {
        if (selectedId)
            getOcorrencia(selectedId);
    }, [selectedId]);



    useEffect(() => {
        if (ocorrenciaSelecionada.id) {
            getEndereçoOcorrencia(Number(ocorrenciaSelecionada.endereco_id));
            getEndereçoDP(Number(ocorrenciaSelecionada.delegacia_id));
            //trazer as variaveis de falecido para o contexto
            //aa funcao getFalecido deve setar as variaveis de falecido

            //getFalecido(Number(ocorrenciaSelecionada.falecido_id));
        }

    }, [ocorrenciaSelecionada]);


    async function getEndereçoOcorrencia(id: number) {
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
        const { data }: OcorrenciasData = await api("/ocorrencias");
        setOcorrencias(data);
    }

    async function getEnderecos() {

        const { data }: EnderecosData = await api(
            `/enderecos`
        );
        setEnderecos(data);
    }

    async function getFalecidos() {
        const { data }: FalecidosData = await api(
            `/falecidos`
        );
        setFalecidos(data);
    }

    function getProtocolo() {
        setProtocolo(ocorrencias.length + 1);
    }

    function getNovoNumeroDaOcorrencia() {
        // precisa atualizar apos recuperar as informações do banco
        // a informação deve vir do numero da ultima ocorrencia + 1 não do tamanho do array


        setNumeroDaOcorrencia(("0000" + (ocorrencias.length + 1)).slice(-4));
        setAnoOcorrencia(Number(new Date().getFullYear().toString().substring(2)));
        setAnoBoletim(Number(new Date().getFullYear().toString().substring(2)));
    }

    useEffect(() => {
        getOcorrencias();
        getFalecidos();
        getEnderecos();
    }, []);

    useEffect(() => {
        getProtocolo();
        getNovoNumeroDaOcorrencia();

    }, [ocorrencias]);

    useEffect(() => {
        if (hospital !== 0) {
            getEndereçoOcorrencia(hospital);
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
        <SvoContext.Provider
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
                ruaFamiliar,
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
                numeroDaOcorrencia,
                anoOcorrencia,
                dataOcorrencia,
                setDataOcorrencia,
                natureza,
                setNatureza,
                boletim,
                setBoletim,
                anoBoletim,
                falecidos,
                enderecos,
                show, setShow, selectedId,
                setSelectedId,

            }}
        >
            {children}
        </SvoContext.Provider>
    );
}

export function useSvo() {
    const context = useContext(SvoContext);
    return context;
}
