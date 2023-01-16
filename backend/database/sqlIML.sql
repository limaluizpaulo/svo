--
-- Arquivo gerado com SQLiteStudio v3.4.1 em seg. jan. 16 13:54:43 2023
--
-- Codificação de texto usada: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabela: agentes
DROP TABLE IF EXISTS agentes;
CREATE TABLE IF NOT EXISTS agentes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    telefone VARCHAR(20),
    plantao VARCHAR(50)
);
INSERT INTO agentes (id, nome, telefone, plantao) VALUES (1, 'George', '111111', '1');

-- Tabela: anexos
DROP TABLE IF EXISTS anexos;
CREATE TABLE IF NOT EXISTS anexos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeArquivo VARCHAR(255),
    arquivo BLOB,
    ocorrencia_id INTEGER,
    FOREIGN KEY (ocorrencia_id) REFERENCES ocorrencias (id)
);

-- Tabela: atendentes
DROP TABLE IF EXISTS atendentes;
CREATE TABLE IF NOT EXISTS atendentes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    codigoFuncional VARCHAR(50),
    plantao VARCHAR(50)
);
INSERT INTO atendentes (id, nome, codigoFuncional, plantao) VALUES (1, 'Maria', 'ATD-02', '16:00 - 00:00');
INSERT INTO atendentes (id, nome, codigoFuncional, plantao) VALUES (2, 'Maria', 'ATD-02', '16:00 - 00:00');

-- Tabela: declaracoesObitos
DROP TABLE IF EXISTS declaracoesObitos;
CREATE TABLE IF NOT EXISTS declaracoesObitos (id INTEGER PRIMARY KEY AUTOINCREMENT, numeroControle VARCHAR (20), ano INTEGER, dataEmissao VARCHAR (50), ocorrencia_id INTEGER, numeroDO VARCHAR (255) UNIQUE, FOREIGN KEY (ocorrencia_id) REFERENCES ocorrencias (id));
INSERT INTO declaracoesObitos (id, numeroControle, ano, dataEmissao, ocorrencia_id, numeroDO) VALUES (1, '00001', 2021, '2021-01-01', NULL, '3535353501-1');
INSERT INTO declaracoesObitos (id, numeroControle, ano, dataEmissao, ocorrencia_id, numeroDO) VALUES (2, '00002', 2021, '2021-01-02', NULL, '3535353502-1');
INSERT INTO declaracoesObitos (id, numeroControle, ano, dataEmissao, ocorrencia_id, numeroDO) VALUES (3, '00003', 2021, '2021-01-03', NULL, '3535353503-1');
INSERT INTO declaracoesObitos (id, numeroControle, ano, dataEmissao, ocorrencia_id, numeroDO) VALUES (4, '00004', 2021, '2021-01-04', NULL, '3535353504-1');
INSERT INTO declaracoesObitos (id, numeroControle, ano, dataEmissao, ocorrencia_id, numeroDO) VALUES (5, '00005', 2021, '2021-01-05', NULL, '3535353505-1');

-- Tabela: delegacias
DROP TABLE IF EXISTS delegacias;
CREATE TABLE IF NOT EXISTS delegacias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    distrito VARCHAR(50),
    endereco_id INTEGER,
    FOREIGN KEY (endereco_id) REFERENCES enderecos (id)
);
INSERT INTO delegacias (id, distrito, endereco_id) VALUES (1, '01º DP de Guarulhos', 1);
INSERT INTO delegacias (id, distrito, endereco_id) VALUES (2, '02º DP de Guarulhos', 2);
INSERT INTO delegacias (id, distrito, endereco_id) VALUES (3, '03º DP de Guarulhos', 3);
INSERT INTO delegacias (id, distrito, endereco_id) VALUES (4, '04º DP de Guarulhos', 4);
INSERT INTO delegacias (id, distrito, endereco_id) VALUES (5, '05º DP de Guarulhos', 5);

-- Tabela: enderecos
DROP TABLE IF EXISTS enderecos;
CREATE TABLE IF NOT EXISTS enderecos (id INTEGER PRIMARY KEY AUTOINCREMENT, rua VARCHAR (255), numero INTEGER, bairro VARCHAR (255), cidade VARCHAR (255), estado VARCHAR (50), complemento VARCHAR (255), cep VARCHAR(255));
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (1, 'Avenida Monteiro Lobato', 244, 'Centro', 'Guarulhos', 'SP', 'sem complemento', '07011003');
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (2, 'Praça da Sé', 0, 'Sé', 'São Paulo', 'SP', 'Catedral da Sé', '22222222');
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (3, 'Rua do Lavradio', 20, 'Centro', 'Rio de Janeiro', 'RJ', 'Casa França-Brasil', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (4, 'Avenida Atlântica', 2964, 'Copacabana', 'Rio de Janeiro', 'RJ', 'Hotel Copacabana Palace', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (5, 'Rua Visconde de Inhaúma', 56, 'Centro', 'São Paulo', 'SP', 'Edifício Copan', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (6, 'Avenida Brigadeiro Faria Lima', 2277, 'Itaim Bibi', 'São Paulo', 'SP', 'Edifício do Banespa', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (7, 'Rua Maria Quitéria', 22, 'Ipanema', 'Rio de Janeiro', 'RJ', 'Ipanema Tower', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (8, 'Avenida Brigadeiro Luís Antônio', 4700, 'Bela Vista', 'São Paulo', 'SP', 'Edifício Altino Arantes', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (9, 'Avenida Presidente Juscelino Kubitschek', 2041, 'Itaim Bibi', 'São Paulo', 'SP', 'Edifício Copan', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (10, 'Avenida das Américas', 500, 'Barra da Tijuca', 'Rio de Janeiro', 'RJ', 'BarraShopping', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (11, 'Rua Uruguaiana', 316, 'Centro', 'Rio de Janeiro', 'RJ', 'Edifício da Bolsa de Valores do Rio de Janeiro', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (12, 'Avenida Brigadeiro Faria Lima', 3477, 'Pinheiros', 'São Paulo', 'SP', 'Edifício Itália', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (13, 'Avenida Atlântica', 4802, 'Ipanema', 'Rio de Janeiro', 'RJ', 'Edifício Rio Ipanema', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (14, 'Avenida Francisco Matarazzo', 774, 'Água Branca', 'São Paulo', 'SP', 'Edifício Altino Arantes', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (15, 'Rua da Carioca', 5, 'Centro', 'Rio de Janeiro', 'RJ', 'Edifício do Banco Central', NULL);
INSERT INTO enderecos (id, rua, numero, bairro, cidade, estado, complemento, cep) VALUES (16, 'Avenida Presidente Juscelino Kubitschek', 4777, 'Centro', 'São Paulo', 'SP', 'Edifício Mirante do Vale', NULL);

-- Tabela: escrivaes
DROP TABLE IF EXISTS escrivaes;
CREATE TABLE IF NOT EXISTS escrivaes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR (255), dp VARCHAR (50), plantao VARCHAR (50));
INSERT INTO escrivaes (id, nome, dp, plantao) VALUES (1, 'João da Silva', '2', 'Manhã');
INSERT INTO escrivaes (id, nome, dp, plantao) VALUES (2, 'Maria Santos', '3', 'Tarde');
INSERT INTO escrivaes (id, nome, dp, plantao) VALUES (3, 'Carlos Souza', '1', 'Noite');
INSERT INTO escrivaes (id, nome, dp, plantao) VALUES (4, 'Ana Maria', '5', 'Manhã');
INSERT INTO escrivaes (id, nome, dp, plantao) VALUES (5, 'Pedro Oliveira', '4', 'Tarde');

-- Tabela: falecidos
DROP TABLE IF EXISTS falecidos;
CREATE TABLE IF NOT EXISTS falecidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    obitoFetal BOOLEAN,
    rgOuRne VARCHAR(20),
    cpf VARCHAR(20),
    nomeDoPai VARCHAR(255),
    nomeDaMae VARCHAR(255),
    naturalidade VARCHAR(255),
    nacionalidade VARCHAR(255),
    sexo VARCHAR(50),
    racaCor VARCHAR(50),
    dataNascimento VARCHAR(50),
    idade INTEGER,
    estadoCivil VARCHAR(50),
    profissao VARCHAR(255)
);
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (2, 'Maria da Silva', 0, '5678', '987.654.321-01', 'João da Silva', 'Ana Maria', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1998', 25, 'Solteira', 'Professora');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (3, 'José da Silva', 0, '9101', '111.222.333-01', 'Antônio da Silva', 'Isabel da Silva', 'Rio de Janeiro', 'Brasileiro', 'Masculino', 'Negra', '01/01/1997', 26, 'Solteiro', 'Médico');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (4, 'Ana Maria', 0, '1121', '222.333.444-01', 'José da Silva', 'Maria da Silva', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1995', 28, 'Solteira', 'Enfermeira');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (5, 'Antônio da Silva', 0, '1331', '333.444.555-01', 'José da Silva', 'Ana Maria', 'Rio de Janeiro', 'Brasileiro', 'Masculino', 'Amarela', '01/01/1993', 30, 'Solteiro', 'Advogado');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (6, 'Isabel da Silva', 0, '1441', '444.555.666-01', 'João da Silva', 'Maria da Silva', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1999', 24, 'Solteira', 'Desenvolvedora de Software');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (7, 'Pedro da Silva', 0, '1551', '555.666.777-01', 'Antônio da Silva', 'Isabel da Silva', 'Rio de Janeiro', 'Brasileiro', 'Masculino', 'Negra', '01/01/1996', 27, 'Solteiro', 'Professor');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (8, 'Carla da Silva', 0, '1661', '666.777.888-01', 'José da Silva', 'Ana Maria', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1994', 29, 'Solteira', 'Arquiteta');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (9, 'Renato da Silva', 0, '1771', '777.888.999-01', 'João da Silva', 'Maria da Silva', 'São Paulo', 'Brasileiro', 'Masculino', 'Amarela', '01/01/1992', 31, 'Solteiro', 'Engenheiro');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (10, 'Juliana da Silva', 0, '1881', '888.999.000-01', 'José da Silva', 'Ana Maria', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1991', 32, 'Solteira', 'Designer Gráfico');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (11, 'João da Silva', 0, '1234', '123.456.789-01', 'José da Silva', 'Maria da Silva', 'São Paulo', 'Brasileira', 'Masculino', 'Branca', '01/01/2000', 23, 'Solteiro', 'Estudante');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (12, 'Maria da Silva', 0, '5678', '987.654.321-01', 'João da Silva', 'Ana Maria', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1998', 25, 'Solteira', 'Professora');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (13, 'José da Silva', 0, '9101', '111.222.333-01', 'Antônio da Silva', 'Isabel da Silva', 'Rio de Janeiro', 'Brasileiro', 'Masculino', 'Negra', '01/01/1997', 26, 'Solteiro', 'Médico');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (14, 'Ana Maria', 0, '1121', '222.333.444-01', 'José da Silva', 'Maria da Silva', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1995', 28, 'Solteira', 'Enfermeira');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (15, 'Antônio da Silva', 0, '1331', '333.444.555-01', 'José da Silva', 'Ana Maria', 'Rio de Janeiro', 'Brasileiro', 'Masculino', 'Amarela', '01/01/1993', 30, 'Solteiro', 'Advogado');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (16, 'Isabel da Silva', 0, '1441', '444.555.666-01', 'João da Silva', 'Maria da Silva', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1999', 24, 'Solteira', 'Desenvolvedora de Software');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (17, 'Pedro da Silva', 0, '1551', '555.666.777-01', 'Antônio da Silva', 'Isabel da Silva', 'Rio de Janeiro', 'Brasileiro', 'Masculino', 'Negra', '01/01/1996', 27, 'Solteiro', 'Professor');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (18, 'Carla da Silva', 0, '1661', '666.777.888-01', 'José da Silva', 'Ana Maria', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1994', 29, 'Solteira', 'Arquiteta');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (19, 'Renato da Silva', 0, '1771', '777.888.999-01', 'João da Silva', 'Maria da Silva', 'São Paulo', 'Brasileiro', 'Masculino', 'Amarela', '01/01/1992', 31, 'Solteiro', 'Engenheiro');
INSERT INTO falecidos (id, nome, obitoFetal, rgOuRne, cpf, nomeDoPai, nomeDaMae, naturalidade, nacionalidade, sexo, racaCor, dataNascimento, idade, estadoCivil, profissao) VALUES (20, 'Juliana da Silva', 0, '1881', '888.999.000-01', 'José da Silva', 'Ana Maria', 'São Paulo', 'Brasileira', 'Feminino', 'Branca', '01/01/1991', 32, 'Solteira', 'Designer Gráfico');

-- Tabela: familiares
DROP TABLE IF EXISTS familiares;
CREATE TABLE IF NOT EXISTS familiares (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    parentesco VARCHAR(50),
    rg VARCHAR(20),
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    celular VARCHAR(20),
    falecido_id INTEGER,
    FOREIGN KEY (falecido_id) REFERENCES falecidos(id)
);
INSERT INTO familiares (id, nome, parentesco, rg, endereco, telefone, celular, falecido_id) VALUES (1, 'Ana Maria', 'Esposa', '123245', '1', '111111111', '1111111', 2);

-- Tabela: hospitais
DROP TABLE IF EXISTS hospitais;
CREATE TABLE IF NOT EXISTS hospitais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    telefone VARCHAR(20),
    endereco_id INTEGER,
    FOREIGN KEY (endereco_id) REFERENCES enderecos (id)
);
INSERT INTO hospitais (id, nome, telefone, endereco_id) VALUES (1, 'Hospital Municipal Dr. José de Carvalho', '11 2222-3333', 1);
INSERT INTO hospitais (id, nome, telefone, endereco_id) VALUES (2, 'Hospital Municipal Dr. Cândido Ferreira', '11 3333-4444', 2);
INSERT INTO hospitais (id, nome, telefone, endereco_id) VALUES (3, 'Hospital Municipal Profª. Dra. Zilda Arns', '11 4444-5555', 3);
INSERT INTO hospitais (id, nome, telefone, endereco_id) VALUES (4, 'Hospital Municipal Dr. José Mariano', '11 5555-6666', 4);
INSERT INTO hospitais (id, nome, telefone, endereco_id) VALUES (5, 'Hospital Municipal Dr. Mário Gatti', '11 6666-7777', 5);

-- Tabela: logs
DROP TABLE IF EXISTS logs;
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataLog DATETIME,
    ocorrencia_id INTEGER,
    FOREIGN KEY (ocorrencia_id) REFERENCES ocorrencias (id)
);

-- Tabela: medicos
DROP TABLE IF EXISTS medicos;
CREATE TABLE IF NOT EXISTS medicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    telefone VARCHAR(20),
    crm VARCHAR(20)
);
INSERT INTO medicos (id, nome, telefone, crm) VALUES (1, 'Dr. Maria da Silva', '88888-8888', '23456');
INSERT INTO medicos (id, nome, telefone, crm) VALUES (2, 'Dr. Maria da Silva', '88888-8888', '23456');

-- Tabela: motoristas
DROP TABLE IF EXISTS motoristas;
CREATE TABLE IF NOT EXISTS motoristas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    telefone VARCHAR(20),
    plantao VARCHAR(50)
);
INSERT INTO motoristas (id, nome, telefone, plantao) VALUES (1, 'João da Silva', '11 9999-8888', 'Diurno');
INSERT INTO motoristas (id, nome, telefone, plantao) VALUES (2, 'Maria Souza', '11 8888-7777', 'Noturno');
INSERT INTO motoristas (id, nome, telefone, plantao) VALUES (3, 'Pedro Martins', '11 7777-6666', 'Diurno');
INSERT INTO motoristas (id, nome, telefone, plantao) VALUES (4, 'Ana Oliveira', '11 6666-5555', 'Noturno');
INSERT INTO motoristas (id, nome, telefone, plantao) VALUES (5, 'Carlos Lopes', '11 5555-4444', 'Diurno');

-- Tabela: naturezas
DROP TABLE IF EXISTS naturezas;
CREATE TABLE IF NOT EXISTS naturezas (id INTEGER PRIMARY KEY AUTOINCREMENT, natureza VARCHAR (255));
INSERT INTO naturezas (id, natureza) VALUES (1, 'natural');
INSERT INTO naturezas (id, natureza) VALUES (2, 'comunicado');
INSERT INTO naturezas (id, natureza) VALUES (3, 'suspeita');
INSERT INTO naturezas (id, natureza) VALUES (4, 'homicidio');
INSERT INTO naturezas (id, natureza) VALUES (5, 'suicidio');
INSERT INTO naturezas (id, natureza) VALUES (6, 'acidente');

-- Tabela: observacoes
DROP TABLE IF EXISTS observacoes;
CREATE TABLE IF NOT EXISTS observacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT,
    ocorrencia_id INTEGER,
    FOREIGN KEY (ocorrencia_id) REFERENCES ocorrencias (id)
);

-- Tabela: ocorrencias
DROP TABLE IF EXISTS ocorrencias;
CREATE TABLE IF NOT EXISTS ocorrencias (id INTEGER PRIMARY KEY AUTOINCREMENT, numeroControle VARCHAR (20), ano INTEGER, protocolo VARCHAR (20), tipoLocal VARCHAR (50), numeroBO VARCHAR (20), anoBO INTEGER, dataHoraChamado VARCHAR (50), dataHoraEntrada VARCHAR (50), dataHoraLiberacao VARCHAR (50), atendente_id INTEGER, endereco_id INTEGER, delegacia_id INTEGER, natureza VARCHAR (50), falecido_id INTEGER, familiar_id INTEGER, motorista_id INTEGER, agente_id INTEGER, viatura_id INTEGER, escrivao_id INTEGER, medico_id INTEGER, FOREIGN KEY (atendente_id) REFERENCES atendentes (id), FOREIGN KEY (endereco_id) REFERENCES enderecos (id), FOREIGN KEY (delegacia_id) REFERENCES delegacias (id), FOREIGN KEY (falecido_id) REFERENCES falecidos (id), FOREIGN KEY (familiar_id) REFERENCES familiares (id), FOREIGN KEY (motorista_id) REFERENCES motoristas (id), FOREIGN KEY (agente_id) REFERENCES agentes (id), FOREIGN KEY (viatura_id) REFERENCES viaturas (id), FOREIGN KEY (escrivao_id) REFERENCES escrivaes (id), FOREIGN KEY (medico_id) REFERENCES medicos (id));
INSERT INTO ocorrencias (id, numeroControle, ano, protocolo, tipoLocal, numeroBO, anoBO, dataHoraChamado, dataHoraEntrada, dataHoraLiberacao, atendente_id, endereco_id, delegacia_id, natureza, falecido_id, familiar_id, motorista_id, agente_id, viatura_id, escrivao_id, medico_id) VALUES (1, '0001', 2023, '0001', '1', 'AQ0001', 2023, '16-01-2022', '16-01-2022', '16-01-2022', 1, 1, 1, 'natural', 2, 1, 1, 1, 1, 1, 1);

-- Tabela: registros
DROP TABLE IF EXISTS registros;
CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataRegistro DATETIME,
    ocorrencia_id INTEGER,
    FOREIGN KEY (ocorrencia_id) REFERENCES ocorrencias (id)
);

-- Tabela: tipos
DROP TABLE IF EXISTS tipos;
CREATE TABLE IF NOT EXISTS tipos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR (255));
INSERT INTO tipos (id, nome) VALUES (1, 'Domicilio');
INSERT INTO tipos (id, nome) VALUES (2, 'Hospital');
INSERT INTO tipos (id, nome) VALUES (3, 'Outros');
INSERT INTO tipos (id, nome) VALUES (4, 'Outros Estabelecimentos de Saúde');
INSERT INTO tipos (id, nome) VALUES (5, 'Via Pública');
INSERT INTO tipos (id, nome) VALUES (6, 'Aldeia Indigena');

-- Tabela: users
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (id, email, password, created_at, updated_at) VALUES (1, 'admin@admin.com', ' $2a$12$Zufw3P1uokwGbvGtQqA7I..Mtd2WNF6TJM5aiGDGL6v6aTXMCfs2q', '2023-01-10 07:18:07', '2023-01-10 07:18:07');
INSERT INTO users (id, email, password, created_at, updated_at) VALUES (2, 'luiz@admin.com', '$2b$10$wfIQ0W2lAVFyHnDhdGUTZ.Vg2Jdvc4PIpu8wgCmnuQY0WiW4e3mB2', '2023-01-14 06:46:16', '2023-01-14 06:46:16');

-- Tabela: viaturas
DROP TABLE IF EXISTS viaturas;
CREATE TABLE IF NOT EXISTS viaturas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prefixo VARCHAR(20),
    marca VARCHAR(50),
    placa VARCHAR(20)
);
INSERT INTO viaturas (id, prefixo, marca, placa) VALUES (1, 'SAM-01', 'Ford', 'ABC-1234');
INSERT INTO viaturas (id, prefixo, marca, placa) VALUES (2, 'SAM-02', 'Chevrolet', 'DEF-5678');
INSERT INTO viaturas (id, prefixo, marca, placa) VALUES (3, 'SAM-03', 'Toyota', 'GHI-9101');
INSERT INTO viaturas (id, prefixo, marca, placa) VALUES (4, 'SAM-04', 'Honda', 'JKL-2345');
INSERT INTO viaturas (id, prefixo, marca, placa) VALUES (5, 'SAM-05', 'Nissan', 'MNO-6789');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
