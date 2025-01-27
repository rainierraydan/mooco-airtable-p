
console.log('v0.2');

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
    // try {
    //   const response = await fetch('/api/data');
    //   const data = await response.json();
    //   console.log('Data from Airtable:', data);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  });