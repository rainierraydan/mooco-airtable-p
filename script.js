// Importa la librería airtable
const Airtable = require('airtable');

console.log('v0.1');


console.log('Iniciando conexión con Airtable...');

// Configura Airtable con tu API key y base ID
const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

// Función para obtener datos de una tabla
async function getTableData(tableName) {
  try {
    const records = await base(tableName).select().all();
    return records.map((record) => record.fields);
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    throw error;
  }
}

// Ejemplo de uso
(async () => {
  const tableName = 'Sheet1'; // Reemplaza con el nombre de tu tabla
  const data = await getTableData(tableName);
  console.log(data);
})();

document.getElementById('runButton').addEventListener('click', async () => {
    console.log('111');    
});