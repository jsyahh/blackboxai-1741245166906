const xlsx = require('xlsx');

// In-memory storage for processed data (in production, use a proper database)
let processedData = [];

const processExcelFile = (buffer) => {
  try {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const processedData = [];

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
      const columns = Object.keys(data[0] || {}); // Extract column headers

      processedData.push({
        sheetName,
        columns,
        data
      });
    });

    return processedData;
  } catch (error) {
    console.error('Error processing Excel file:', error);
    throw new Error('Failed to process Excel file');
  }
};

const storeProcessedData = (data) => {
  processedData = data; // Store data in memory or database
};

const getAllProcessedData = () => {
  return processedData; // Retrieve all processed data
};

module.exports = {
  processExcelFile,
  storeProcessedData,
  getAllProcessedData
};
