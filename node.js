const { Airtable } = require('airtable');

// Configura cliente de Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN
}).base(process.env.AIRTABLE_BASE_ID);

// Función para obtener registros
async function fetchRecords(tableName, options = {}) {
  try {
    const records = await base(tableName).select({
      maxRecords: options.maxRecords || 100,
      view: options.view || 'Grid view'
    }).firstPage();

    return records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error(`Error fetching records from ${tableName}:`, error);
    throw error;
  }
}

// Función para crear registro
async function createRecord(tableName, recordData) {
  try {
    const newRecord = await base(tableName).create(recordData);
    return newRecord;
  } catch (error) {
    console.error(`Error creating record in ${tableName}:`, error);
    throw error;
  }
}

// Función para actualizar registro
async function updateRecord(tableName, recordId, updateData) {
  try {
    const updatedRecord = await base(tableName).update(recordId, updateData);
    return updatedRecord;
  } catch (error) {
    console.error(`Error updating record in ${tableName}:`, error);
    throw error;
  }
}

module.exports = {
  base,
  fetchRecords,
  createRecord,
  updateRecord
};