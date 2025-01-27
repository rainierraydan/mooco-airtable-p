require('dotenv').config();
const auth = require('basic-auth');
const express = require('express');
const path = require('path');
const { getTableData } = require('./airtable');
const { getFigmaFileData } = require('./figma'); // Importa la función de figma.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de autenticación básica
app.use((req, res, next) => {
    const user = auth(req);
    const username = process.env.AUTH_USERNAME || 'admin'; // Cambia 'admin' por tu usuario
    const password = process.env.AUTH_PASSWORD || 'miclave'; // Cambia 'miclave' por tu clave
  
    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm="Acceso restringido"');
      return res.status(401).send('Acceso no autorizado');
    }
    next();
  });

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener datos de Airtable
app.get('/api/data', async (req, res) => {
  try {
    const data = await getTableData('001'); // Cambia 'Sheet1' por el nombre de tu tabla
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Endpoint para obtener datos de Figma
app.get('/api/figma', async (req, res) => {
    try {
      const figmaData = await getFigmaFileData();
      res.json(figmaData);
    } catch (error) {
      console.error('Error fetching data from Figma:', error);
      res.status(500).json({ error: 'Error fetching data from Figma' });
    }
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});