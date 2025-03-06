const express = require('express');
const { getAllProcessedData, getDataBySection } = require('../utils/excelProcessor');

const router = express.Router();

// Get all processed data
router.get('/', (req, res) => {
  try {
    const data = getAllProcessedData();
    res.json({ 
      success: true, 
      data: data.map(sheet => ({
        sheetName: sheet.sheetName,
        columns: sheet.columns,
        rowCount: sheet.data.length
      }))
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to retrieve dashboard data' 
    });
  }
});

// Get data by specific section
router.get('/:section', (req, res) => {
  try {
    const section = req.params.section;
    const data = getDataBySection(section);
    
    if (!data || data.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `No data found for section: ${section}` 
      });
    }

    res.json({ 
      success: true, 
      data: data.map(sheet => ({
        sheetName: sheet.sheetName,
        columns: sheet.columns,
        rowCount: sheet.data.length,
        data: sheet.data // Include actual data for charting
      }))
    });
  } catch (error) {
    console.error('Section data error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to retrieve section data' 
    });
  }
});

module.exports = router;
