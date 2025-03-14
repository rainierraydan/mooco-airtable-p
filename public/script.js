
console.log('v0.04');
var curAirtable, curFigma;

document.getElementById('airTableButton').addEventListener('click', async () => {
    console.log('Fetching data from Airtable...');
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        // Función recursiva para transformar las claves del objeto
        function transformKeys(obj) {
            if (Array.isArray(obj)) {
                // Si es un array, transformamos cada elemento
                return obj.map(item => transformKeys(item));
            } else if (typeof obj === 'object' && obj !== null) {
                // Si es un objeto, transformamos cada clave
                const transformed = {};
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const newKey = key
                            .replace(/\s+/g, '') // Elimina espacios
                            .toLowerCase(); // Convierte a minúsculas
                        transformed[newKey] = transformKeys(obj[key]); // Aplicamos recursivamente
                    }
                }
                return transformed;
            }
            // Si no es un objeto ni un array, devolvemos el valor tal cual
            return obj;
        }

        // Transformamos las claves del objeto data
        const transformedData = transformKeys(data);

        console.log('Data from Airtable:', transformedData);
        curAirtable = transformedData;
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('FigmaButton').addEventListener('click', async () => {
    console.log('Fetching data from Figma...');
    try {
        const response = await fetch('/api/figma');
        const data = await response.json();

        // Función recursiva para buscar layers de texto
        function findTextLayers(node) {
            let textLayers = [];

            // Si el nodo es un texto y tiene un nombre que coincide con los buscados
            // if (node.type === 'TEXT' && node.name.startsWith('#')) {
            if (node.type === 'TEXT') {
                const layerName = node.name
                    // .replace('#', '') // Elimina el #
                    .toLowerCase() // Convierte a minúsculas
                    .replace(/\s+/g, ''); // Elimina espacios

                textLayers.push({
                    name: layerName, // Nombre transformado
                    value: node.characters || '' // Obtiene el texto del layer
                });
            }

            // Si tiene hijos, recorre recursivamente
            if (node.children) {
                node.children.forEach(child => {
                    textLayers = textLayers.concat(findTextLayers(child));
                });
            }

            return textLayers;
        }

        // Filtra los frames por nombre y busca los layers de texto
        const targetFrames = ['300x250', '250x250', '160x600'];
        const pages = data.document.children;

        const result = pages
            .flatMap(page => page.children) // Obtiene todos los frames de todas las páginas
            .filter(frame => targetFrames.includes(frame.name)) // Filtra los frames por nombre
            .map(frame => {
                const textLayers = findTextLayers(frame); // Busca los layers de texto en el frame
                const frameData = {
                    name: frame.name, // Nombre del frame (300x250, 250x250, etc.)
                };

                // Agrega los layers de texto encontrados al objeto del frame
                textLayers.forEach(layer => {
                    frameData[layer.name] = layer.value;
                });

                return frameData;
            });

        console.log('Frames with text layers:', result);
        curFigma = result;
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('DupFigmaButton').addEventListener('click', async () => {
    console.log('Duplicating Figma file...');
    try {
        // Hacer una solicitud POST al endpoint /api/duplicate-figma
        const response = await fetch('/api/duplicate-figma', {
            method: 'POST', // Asegúrate de usar POST
            headers: {
                'Content-Type': 'application/json', // Indica que el cuerpo es JSON
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log('New Figma file URL:', result.newFileUrl);
    } catch (error) {
        console.error('Error:', error);
    }
});