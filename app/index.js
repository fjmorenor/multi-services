const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>¡Hola desde Google Cloud! 🚀</h1><p>App desplegada con Terraform y Artifact Registry.</p>');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,     // Lee la IP del YAML
  user: process.env.DB_USER,     // Lee el usuario del YAML
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME
});

// Añade un log para saber si funciona
connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a la DB:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos MySQL con éxito');
  }
});