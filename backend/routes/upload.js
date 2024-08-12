const express = require("express");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");
const Tesseract = require("tesseract.js");
const axios = require("axios");


dotenv.config();

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imagePath = req.file.path;

  try {
    // 1. Extract text from the image using OCR
    console.log('Performing OCR on the uploaded image...');
    const ocrResult = await Tesseract.recognize(imagePath, 'eng');

    const extractedText = cleanOcrText(ocrResult.data.text);
    console.log('Cleaned OCR Text:', extractedText);

    // 2. Send the extracted text to OpenAI API for processing
    console.log('Sending extracted text to OpenAI for completion...');
    const completionResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Você é um assistente útil que transforma textos OCR em JSON.' },
          { role: 'user', content: generatePrompt(extractedText) }
        ],
        max_tokens: 2048,
        temperature: 0,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const completionText = completionResponse.data.choices[0].message.content.trim();
    console.log('Completion text:', completionText);

    // 3. Parse the completion text to JSON
    let extractedData;
    try {
      extractedData = JSON.parse(completionText);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      return res.status(500).json({ error: 'Failed to parse the response from OpenAI as JSON.' });
    }

    // 4. Send the extracted data back to the client
    res.json({ data: extractedData });

  } catch (error) {
    console.error('Error occurred:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    } else {
      console.error('Error details:', error);
    }
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    fs.unlinkSync(imagePath);
  }
});

function cleanOcrText(text) {
  // Remove caracteres que não sejam letras, números, espaços ou pontuação básica
  return text.replace(/[^\w\s.,:;!?()-]/g, '').replace(/\s+/g, ' ').trim();
}

function generatePrompt(extractedText) {
  return `
   O texto a seguir foi extraído de um documento oficial utilizando OCR:
    """
    ${extractedText}
    """
    Com base no texto acima, preencha as chaves do JSON com os valores correspondentes. Se algum valor não estiver presente no texto, deixe o campo em branco.
        Certifique-se de que os nomes, localidades e demais informações estejam no formato "Title Case", onde a primeira letra de cada palavra é maiúscula e o restante é minúsculo. Se algum valor não estiver presente no texto, deixe o campo em branco.

    Retorne apenas o JSON, sem explicações ou qualquer outro texto adicional.

    Exemplo de JSON:
    {
      "DistritoPolicial": "", // ex: "01 Guarulhos", "02 Guarulhos", "03 Guarulhos', "04 Guarulhos", "05 Guarulhos", "06 Guarulhos", "07 Guarulhos", "08 Guarulhos", "09 Guarulhos", "Sta Isabel", "Ajujá", "Mairiporã". 
      "BoletimOcorrencia": "", // ex: AB12345 / 2024
      "Local": "", // ex: Hospital Municipal de Guarulhos
      "CujoLocalÉ": "", // ex: Hospital, Casa, Via Pública
      "Naturezas": "", // ex: Morte Natural, Morte Violenta, Morte Suspeita
      "RuaOcorrencia"'', // ex: Rua Exemplo
      "NumeroOcorrencia": "", // ex: 123
      "BairroOcorrencia": "", // ex: Bairro 1
      "CidadeOcorrencia": "", // ex: Guarulhos
      "EstadoOcorrencia": "", // ex: SP
      "CepOcorrencia": "", // ex: 12345-678
      "DataOcorrencia": "", // ex: 01/01/2022
      "HoraOcorrencia": "", // ex: 14:30
      "Nome": "", // ex: João da Silva
      "RGFalecido": "", // ex: RG 123456789
      "CPFFalecido": "", // ex: 12345678900
      "DataNascimento": "", // ex: 01/01/1990
      "Idade": "", // ex: 32
      "Nacionalidade": "", // ex: Brasileira
      "Naturalidade": "", // ex: São Paulo/SP
      "Sexo": "", // ex: M, F ou Ignorado
      "EstadoCivil": "", // ex: Solteiro
      "Cor": "", // ex: Branca
      "Profissao": "",
      "NomePai": "",
      "NomeMae": "",
      "LogradouroResidencia": "",
      "NumeroResidencia": "",
      "ComplementoResidencia": "",
      "BairroResidencia": "",
      "MunicipioResidencia": "",
      "UFResidencia": "",
      "CepResidencia": "",
    }
    
  `;
}


module.exports = router;
