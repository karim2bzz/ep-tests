const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques du dossier public
app.use(express.static("public"));

// Route POST pour recevoir le formulaire
app.post("/contact", (req, res) => {
  const { nom, email, message } = req.body;

  const formattedMessage = `
Nom : ${nom}
Email : ${email}
Message : ${message}
--------------------------\n`;

  fs.appendFileSync("submissions.txt", formattedMessage, "utf-8");

  // Réponse JSON pour éviter page blanche
  res.status(200).json({ success: true });
});

// Route GET pour télécharger les messages
app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "submissions.txt");

  if (fs.existsSync(filePath)) {
    res.download(filePath, "messages.txt");
  } else {
    res.status(404).send("Aucun message enregistré.");
  }
});

// Rediriger toute autre route vers index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
