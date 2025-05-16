import React, { useState } from "react";
import UploadComponent from "./components/UploadComponent";
import ChartSelection from "./components/ChartSelection";
import ChartDisplay from "./components/ChartDisplay";
import "./App.css";

const App = () => {
  const [excelData, setExcelData] = useState([]);
  const [charts, setCharts] = useState([]); // Store multiple charts
  const [selectedChartIndex, setSelectedChartIndex] = useState(null); // Track selected chart for deletion

  // Function to add a new chart
  const handleChartAdd = (selectedChart) => {
    setCharts([...charts, selectedChart]);
  };

  // Function to update the selected chart index
  const handleChartSelect = (event) => {
    setSelectedChartIndex(Number(event.target.value));
  };

  // Function to delete the selected chart
  const handleChartDelete = () => {
    if (selectedChartIndex !== null) {
      setCharts(charts.filter((_, i) => i !== selectedChartIndex));
      setSelectedChartIndex(null); // Reset selection
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="headerbarContainer">
        <img src="/praveenlogo1.png" alt="App Logo" className="logo" />
        <h1>Excel-Chart Dashboard</h1>
        <button className="refresh-icon" onClick={() => window.location.reload()}>
          🔄 {/* ✅ Refresh Icon */}
        </button>
      </div>

      {/* Upload Section */}
      <div className="uploadbarContainer">
        <UploadComponent onDataExtracted={setExcelData} />
      </div>

      {/* Main Section (Sidebar + Chart Section) */}
      <div className="mainsectionContainer">
        {/* Sidebar */}
        <div className="sidebar">
          {excelData.length > 0 && (
            <ChartSelection columns={excelData[0]} onChartSelected={handleChartAdd} />
          )}
          
          {/* Chart Selection Dropdown */}
          {charts.length > 0 && (
            <div className="chart-select-container">
                <select onChange={handleChartSelect} value={selectedChartIndex || ""}>
                <option value="" disabled>Select a chart</option>
                {charts.map((chart, index) => (
                  <option key={index} value={index}>
                    {chart.chartType} - {chart.xAxis} vs {chart.yAxis}
                  </option>
                ))}
              </select>
              <button onClick={handleChartDelete} className="delete-button">Delete Chart</button>
            </div>
          )}
        </div>

        {/* Chart Display Section */}
        <div className="ChartMainsection">
          {charts.map((chart, index) => (
            <div key={index} className="chart-wrapper">
              <ChartDisplay selectedChart={chart} excelData={excelData} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footerbarContainer">
        <p>Bojja'sTechhub©2025. All rights reserved </p>
      </div>
    </div>
  );
};

export default App;