const express = require('express');
const multer = require('multer');
const { processExcelFile, storeProcessedData } = require('../utils/excelProcessor');

const router = express.Router();
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only Excel files are allowed.'), false);
    }
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const processedData = await processExcelFile(req.file.buffer);
    storeProcessedData(processedData);
    
    res.json({ 
      success: true, 
      data: processedData.map(sheet => ({
        sheetName: sheet.sheetName,
        columns: sheet.columns,
        rowCount: sheet.data.length
      }))
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to process uploaded file' 
    });
  }
});

module.exports = router;
