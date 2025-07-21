const express = require("express");
const multer = require("multer");
const cors = require("cors");
const sharp = require("sharp");
const path = require("path");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const heicConvert = require("heic-convert");
app.use(cors());

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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
