import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2'; // Assuming Chart.js is used

function ChartCustomizer({ processedData }) {
  const [selectedSheet, setSelectedSheet] = useState('');
  const [xAxisColumn, setXAxisColumn] = useState('');
  const [yAxisColumn, setYAxisColumn] = useState('');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (processedData.length > 0) {
      setSelectedSheet(processedData[0].sheetName); // Default to the first sheet
    }
  }, [processedData]);

  const handleSheetChange = (event) => {
    setSelectedSheet(event.target.value);
  };

  const handleXAxisChange = (event) => {
    setXAxisColumn(event.target.value);
  };

  const handleYAxisChange = (event) => {
    setYAxisColumn(event.target.value);
  };

  const generateChartData = () => {
    const selectedData = processedData.find(sheet => sheet.sheetName === selectedSheet);
    if (selectedData) {
      const labels = selectedData.data.map(row => row[xAxisColumn]);
      const data = selectedData.data.map(row => row[yAxisColumn]);

      setChartData({
        labels,
        datasets: [
          {
            label: yAxisColumn,
            data,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      });
    }
  };

  return (
    <div>
      <h3>Chart Customizer</h3>
      <select onChange={handleSheetChange} value={selectedSheet}>
        {processedData.map(sheet => (
          <option key={sheet.sheetName} value={sheet.sheetName}>
            {sheet.sheetName}
          </option>
        ))}
      </select>

      <select onChange={handleXAxisChange} value={xAxisColumn}>
        {processedData.find(sheet => sheet.sheetName === selectedSheet)?.columns.map(column => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>

      <select onChange={handleYAxisChange} value={yAxisColumn}>
        {processedData.find(sheet => sheet.sheetName === selectedSheet)?.columns.map(column => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>

      <button onClick={generateChartData}>Generate Chart</button>

      {chartData.labels && (
        <Chart type="bar" data={chartData} />
      )}
    </div>
  );
}

export default ChartCustomizer;
