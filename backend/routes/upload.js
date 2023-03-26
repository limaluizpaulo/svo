const express = require("express");
const multer = require("multer");
const documentai = require("@google-cloud/documentai").v1;
const mime = require("mime-types");

const PROJECT_ID = "935318343351";
const LOCATION = "us";
const PROCESSOR_ID = "f722b12ad9504180";
const CONFIDENCE_THRESHOLD = 0.6;
const KEY_FILE_PATH = "./svo-project-381400-cc4941dac6fa.json";

const client = new documentai.DocumentProcessorServiceClient({
  keyFilename: KEY_FILE_PATH,
});

const router = express.Router();
const upload = multer();

async function processDocument(documentBuffer, mimeType) {
  const request = {
    name: `projects/${PROJECT_ID}/locations/${LOCATION}/processors/${PROCESSOR_ID}`,
    rawDocument: {
      content: documentBuffer.toString("base64"),
      mimeType,
    },
  };

  const [response] = await client.processDocument(request);
  return response;
}

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const mimeType = mime.lookup(req.file.originalname);
    const result = await processDocument(req.file.buffer, mimeType);
    const { entities } = result.document;

    const resposta = entities.reduce((acc, entity) => {
      if (entity.confidence > CONFIDENCE_THRESHOLD) {
        acc[entity.type] = entity.mentionText;
      }
      return acc;
    }, {});

    res.send(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro ao processar o documento" });
  }
});

module.exports = router;
