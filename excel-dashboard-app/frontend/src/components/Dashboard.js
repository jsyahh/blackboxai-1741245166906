import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import ChartCustomizer from './ChartCustomizer';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard({ data }) {
  const [charts, setCharts] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      // Get the first file's first sheet as default
      const firstFile = data[0];
      if (firstFile.sheets && firstFile.sheets.length > 0) {
        setSelectedSheet(firstFile.sheets[0]);
        generateDefaultCharts(firstFile.sheets[0]);
      }
    }
  }, [data]);

  const generateDefaultCharts = (sheetData) => {
    if (!sheetData || !sheetData.data || sheetData.data.length === 0) return;

    const columns = sheetData.columns;
    const numericColumns = columns.filter(col => 
      typeof sheetData.data[0][col] === 'number'
    );

    // Generate a bar chart and line chart for each numeric column
    const newCharts = numericColumns.map((column, index) => ({
      id: `chart-${index}`,
      type: index % 2 === 0 ? 'bar' : 'line',
      title: `${column} Analysis`,
      data: {
        labels: sheetData.data.map((row, i) => `Row ${i + 1}`),
        datasets: [{
          label: column,
          data: sheetData.data.map(row => row[column]),
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${column} Analysis`
          }
        }
      }
    }));

    setCharts(newCharts);
  };

  const handleChartCustomization = (chartId, updates) => {
    setCharts(prevCharts => 
      prevCharts.map(chart => 
        chart.id === chartId
          ? { ...chart, ...updates }
          : chart
      )
    );
  };

  const renderChart = (chart) => {
    const ChartComponent = {
      'bar': Bar,
      'line': Line,
      'pie': Pie
    }[chart.type];

    return (
      <div key={chart.id} className="bg-white rounded-lg shadow p-4 mb-6">
        <ChartCustomizer
          chart={chart}
          onUpdate={(updates) => handleChartCustomization(chart.id, updates)}
        />
        <div className="h-80">
          <ChartComponent data={chart.data} options={chart.options} />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Data Visualization Dashboard
        </h2>
        
        {/* File/Sheet selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Data Source
          </label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => {
              const [fileIndex, sheetIndex] = e.target.value.split('-');
              const sheet = data[fileIndex].sheets[sheetIndex];
              setSelectedSheet(sheet);
              generateDefaultCharts(sheet);
            }}
          >
            {data.map((file, fileIndex) => (
              file.sheets.map((sheet, sheetIndex) => (
                <option 
                  key={`${fileIndex}-${sheetIndex}`} 
                  value={`${fileIndex}-${sheetIndex}`}
                >
                  {`${file.filename} - ${sheet.sheetName}`}
                </option>
              ))
            ))}
          </select>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charts.map(chart => renderChart(chart))}
        </div>

        {/* No data message */}
        {(!charts || charts.length === 0) && (
          <div className="text-center py-12">
            <i className="fas fa-chart-bar text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">
              No charts available. Please select a different data source or ensure your Excel file contains numeric data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
