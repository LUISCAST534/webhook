// index.js - Webhook para verificación y recepción de mensajes de WhatsApp
// Compatible con Render.com

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// TOKEN de verificación de Meta (colócalo en Render como variable de entorno VERIFY_TOKEN)
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "miverifytoken";

// Ruta GET para verificación
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado correctamente.");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Ruta POST para recibir mensajes
app.post("/webhook", (req, res) => {
  console.log("🔔 Evento recibido:", JSON.stringify(req.body, null, 2));

  // RESPONDER MENSAJES ENTRANTES (si deseas)
  // Aquí puedes procesar el mensaje recibido y responder usando la API de WhatsApp

  res.sendStatus(200);
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor webhook escuchando en puerto ${PORT}`);
});