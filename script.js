
console.log('v0.1');

document.getElementById('runButton').addEventListener('click', async () => {
    console.log('111');    
    console.log('API Key:', process.env.AIRTABLE_API_KEY);
    console.log('Base ID:', process.env.AIRTABLE_BASE_ID);
});