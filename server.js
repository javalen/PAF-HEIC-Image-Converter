const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const heicConvert = require("heic-convert");
app.use(cors());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "PAF-HEIC-Image-Converter",
    checkedAt: new Date().toISOString(),
  });
});

app.post("/convert", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");
  console.log("HEIC conversion request received");
  try {
    const outputBuffer = await heicConvert({
      buffer: req.file.buffer,
      format: "JPEG",
      quality: 0.8,
    });

    res.set("Content-Type", "image/jpeg");
    res.send(outputBuffer);
  } catch (err) {
    console.error("Conversion failed", err);
    res.status(500).send("Conversion failed");
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () =>
  console.log(`PAF-HEIC-Image-Converter listening on ${HOST}:${PORT}`)
);
