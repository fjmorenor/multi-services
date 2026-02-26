const express = require('express');
const mysql = require('mysql2');
const { PubSub } = require('@google-cloud/pubsub');

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración de Pub/Sub
const pubsub = new PubSub();
const topicName = 'db-app-principal';

// Configuración de MySQL (usando las variables de entorno que pusimos en el YAML)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a MySQL:', err.message);
  } else {
    console.log('✅ Conectado a MySQL con éxito');
  }
});

// RUTA 1: Prueba de la App
app.get('/', (req, res) => {
  res.send('<h1>Servicio Activo 🚀</h1><p>Conectado a DB y listo para Pub/Sub.</p>');
});

// RUTA 2: Publicar en Pub/Sub
app.get('/test-pubsub', async (req, res) => {
  const data = JSON.stringify({ 
    mensaje: '¡Hola desde Kubernetes!', 
    timestamp: new Date().toISOString(),
    origen: 'App-Node-GKE'
  });
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
    console.log(`✅ Mensaje ${messageId} publicado en Pub/Sub.`);
    
    // Opcional: Guardar rastro en la DB de que enviamos un mensaje
    // db.query('INSERT INTO logs (evento) VALUES (?)', [`Mensaje ${messageId} enviado`]);

    res.send(`<h3>Éxito</h3><p>Mensaje enviado a Pub/Sub con ID: <b>${messageId}</b></p>`);
  } catch (error) {
    console.error('❌ Error publicando en Pub/Sub:', error);
    res.status(500).send('Error al enviar mensaje a Pub/Sub');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});