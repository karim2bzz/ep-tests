const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", (req, res) => {
  const data = req.body;
  fs.appendFileSync("submissions.txt", JSON.stringify(data) + "\n");
  res.status(200).send("Message reçu !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});