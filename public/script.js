
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
        
        function getAllLayers(node) {
            let layers = [];
            // Añade el layer actual
            layers.push({
                name: node.name,
                type: node.type
            });
            
            // Si tiene hijos, recorre recursivamente
            if (node.children) {
                node.children.forEach(child => {
                    layers = layers.concat(getAllLayers(child));
                });
            }
            return layers;
        }

        const pages = data.document.children;
        const pagesWithLayers = pages.map(page => ({
            name: page.name,
            layers: getAllLayers(page)
        }));

        console.log('Pages with all nested layers:', pagesWithLayers);
    } catch (error) {
        console.error('Error:', error);
    }
});