
document.getElementById('runButton').addEventListener('click', async () => {
    try {
      const response = await fetch('/pages/api/airtable-fetch'); // Endpoint de tu API en Vercel
      const data = await response.json();
      
      console.log(JSON.stringify(data, null, 2)); // Muestra datos en consola
      // Puedes manipular 'data' como necesites
    } catch (error) {
      console.error('Error al buscar datos:', error);
    }
  });