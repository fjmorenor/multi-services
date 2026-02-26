const express = require('express');
const { Client } = require('pg'); // Cambiado a librería de PostgreSQL
const { PubSub } = require('@google-cloud/pubsub');

const app = express();
const PORT = process.env.PORT || 8080;

// 1. CONFIGURACIÓN DE PUB/SUB
const pubsub = new PubSub({
    projectId: 'multi-services-488417' 
});
const topicName = 'projects/multi-services-488417/topics/topic-eventos-app';

// 2. CONFIGURACIÓN DE POSTGRESQL
const db = new Client({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'MiPassword123!', // Asegúrate de que coincida con la que pusiste en la consola
    database: process.env.DB_NAME || 'db-app-principal',
    port: 5432
});

db.connect(err => {
    if (err) {
        console.error('❌ Error conectando a PostgreSQL:', err.stack);
    } else {
        console.log('✅ Conectado a PostgreSQL con éxito');
    }
});

// RUTA 1: Prueba de la App
app.get('/', (req, res) => {
    res.send('<h1>Servicio Activo 🚀</h1><p>Código v6 (Postgres) cargado y listo.</p>');
});

// RUTA 2: Publicar en Pub/Sub
app.get('/test-pubsub', async (req, res) => {
    const data = JSON.stringify({
        mensaje: '¡Hola desde Kubernetes con Postgres!',
        timestamp: new Date().toISOString()
    });
    const dataBuffer = Buffer.from(data);

    try {
        const messageId = await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
        console.log(`✅ Mensaje ${messageId} publicado.`);
        res.send(`<h2>Éxito</h2><p>Mensaje enviado. ID: ${messageId}</p>`);
    } catch (error) {
        console.error('❌ Error en Pub/Sub:', error);
        res.status(500).send(`<h2>Error</h2><p>${error.message}</p>`);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor v6 escuchando en puerto ${PORT}`);
});