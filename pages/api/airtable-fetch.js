const { fetchRecords } = require('../../lib/airtable');

export default async function handler(req, res) {
  try {
    const records = await fetchRecords('Sheet1');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}