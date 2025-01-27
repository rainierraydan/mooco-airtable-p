const fetch = require('node-fetch');

// Configura las credenciales de Figma
const FIGMA_TOKEN = process.env.FIGMA_TOKEN; // Tu token de Figma
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID; // El ID del archivo de Figma

// Función para obtener las páginas y layers de Figma
async function getFigmaFileData() {
  try {
    const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Figma:', error);
    throw error;
  }
}

module.exports = { getFigmaFileData };