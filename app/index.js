const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>¡Hola desde Google Cloud! 🚀</h1><p>App desplegada con Terraform y Artifact Registry.</p>');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});