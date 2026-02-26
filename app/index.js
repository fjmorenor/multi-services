const express = require('express');
const { Client } = require('pg'); 
const { PubSub } = require('@google-cloud/pubsub');

const app = express();
const PORT = process.env.PORT || 8080;

// 1. CONFIGURACIÓN DE PUB/SUB
const pubsub = new PubSub({
    projectId: 'multi-services-488417' 
});
const topicName = 'projects/multi-services-488417/topics/topic-eventos-app';

// 2. CONFIGURACIÓN DE POSTGRESQL
const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'MiPassword123!', 
    database: process.env.DB_NAME || 'db-app-principal',
    port: 5432
};

let db;

function conectarDB() {
    db = new Client(dbConfig);
    db.connect(err => {
        if (err) {
            console.error('❌ Error conectando a PostgreSQL (reintentando en 5s):', err.message);
            setTimeout(conectarDB, 5000);
        } else {
            console.log('✅ Conectado a PostgreSQL con éxito');
        }
    });

    db.on('error', err => {
        console.error('❌ Error inesperado en la base de datos:', err);
        if (err.code === 'ECONNRESET' || err.code === '57P01') {
            conectarDB();
        }
    });
}

conectarDB();

// RUTA 1: Página principal
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>Servicio Activo 🚀</h1>
            <p>Estado: <b>Conectado a GKE, Pub/Sub y Postgres</b></p>
            <p>Versión: <b>v7 (Final)</b></p>
            <br>
            <a href="/test-pubsub" style="padding: 15px 25px; background: #4285f4; color: white; text-decoration: none; border-radius: 5px;">Probar Flujo de Datos</a>
        </div>
    `);
});

// RUTA 2: El flujo completo (Pub/Sub + Postgres)
app.get('/test-pubsub', async (req, res) => {
    const payload = {
        mensaje: '¡Hola desde Kubernetes con Postgres!',
        timestamp: new Date().toISOString(),
        origen: 'GKE-Deployment-NodeJS'
    };
    const dataBuffer = Buffer.from(JSON.stringify(payload));

    try {
        // A. Publicar en Google Cloud Pub/Sub
        const messageId = await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
        console.log(`✅ Pub/Sub: Mensaje ${messageId} publicado.`);

        // B. Guardar registro en la tabla de PostgreSQL
        const queryText = 'INSERT INTO registro_eventos(mensaje_id, contenido) VALUES($1, $2) RETURNING id';
        const queryValues = [messageId, payload];
        
        const dbRes = await db.query(queryText, queryValues);
        const localId = dbRes.rows[0].id;
        console.log(`✅ DB: Evento registrado con ID local: ${localId}`);

        res.send(`
            <div style="font-family: sans-serif; border: 2px solid green; padding: 20px; border-radius: 10px; max-width: 600px; margin: 40px auto;">
                <h2 style="color: green;">✅ ¡Flujo Completado!</h2>
                <p><b>Pub/Sub ID:</b> ${messageId}</p>
                <p><b>Postgres ID:</b> ${localId}</p>
                <a href="/">Volver</a>
            </div>
        `);
    } catch (error) {
        console.error('❌ Error en el proceso:', error);
        res.status(500).send(`<h2>❌ Error</h2><p>${error.message}</p>`);
    }
}); // <--- Aquí se cierra la ruta test-pubsub

app.listen(PORT, () => {
    console.log(`Servidor v7 escuchando en puerto ${PORT}`);
});