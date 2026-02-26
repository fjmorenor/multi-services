const express = require('express');
const mysql = require('mysql2');
const { PubSub } = require('@google-cloud/pubsub');

const app = express();
const PORT = process.env.PORT || 8080;

// 1. CONFIGURACIÓN DE PUB/SUB (Con ID de proyecto explícito)
const pubsub = new PubSub({
    projectId: 'multi-services-488417' 
});
const topicName = 'topic-eventos-app';

// 2. CONFIGURACIÓN DE MYSQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || '10.4.0.3',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'tu-password-seguro',
    database: process.env.DB_NAME || 'db-app-principal',
    connectTimeout: 10000 // 10 segundos de margen
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
    res.send('<h1>Servicio Activo 🚀</h1><p>Código v6 cargado. Listo para probar Pub/Sub.</p>');
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
        console.log(`Intentando publicar en el topic: ${topicName}...`);
        const messageId = await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
        
        console.log(`✅ Mensaje ${messageId} publicado con éxito.`);
        res.send(`
            <div style="font-family: sans-serif; border: 2px solid green; padding: 20px; border-radius: 10px;">
                <h2 style="color: green;">¡Éxito!</h2>
                <p>Mensaje enviado a Pub/Sub correctamente.</p>
                <p>ID del Mensaje: <b>${messageId}</b></p>
                <hr>
                <small>Verifica en la consola de Google Cloud -> Pub/Sub -> Subscriptions</small>
            </div>
        `);
    } catch (error) {
        console.error('❌ Error detallado en Pub/Sub:', error);
        res.status(500).send(`
            <div style="font-family: sans-serif; border: 2px solid red; padding: 20px; border-radius: 10px;">
                <h2 style="color: red;">Error en Pub/Sub</h2>
                <p>Detalle: ${error.message}</p>
                <p>Asegúrate de que el Topic <b>${topicName}</b> existe y tienes permisos de Publisher.</p>
            </div>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor v6 escuchando en puerto ${PORT}`);
});