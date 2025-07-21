const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  console.log("HEIC File Recieved...");
  const filePath = path.join(__dirname, "uploads", req.file.filename);
  const fileBuffer = fs.readFileSync(filePath);

  // You can do something with fileBuffer here...

  res.json({ message: "File received", file: req.file.filename });
});

app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.download(filePath);
});

app.listen(3000, () => console.log("Server running on port 3000"));
