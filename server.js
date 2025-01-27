require('dotenv').config();
const express = require('express');
const path = require('path');
const { getTableData } = require('./airtable');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});