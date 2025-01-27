
console.log('v0.3');

document.getElementById('airTableButton').addEventListener('click', async () => {
    console.log('Fetching data from Airtable...');
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      console.log('Data from Airtable:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  });
document.getElementById('FigmaButton').addEventListener('click', async () => {
    console.log('Fetching data from Figma...');
    try {
        const response = await fetch('/api/figma');
        const data = await response.json();
        console.log('Data from Figma:', data);
    
        // Procesa los datos para obtener páginas y layers
        const pages = data.document.children; // Las páginas del archivo
        const pagesWithLayers = pages.map((page) => ({
          name: page.name,
          layers: page.children.map((layer) => layer.name), // Los layers de cada página
        }));
    
        console.log('Pages with layers:', pagesWithLayers);
      } catch (error) {
        console.error('Error:', error);
      }
  });