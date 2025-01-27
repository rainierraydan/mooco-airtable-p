
console.log('v0.1');

document.getElementById('runButton').addEventListener('click', async () => {
    console.log('Fetching data from Airtable...');
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      console.log('Data from Airtable:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  });