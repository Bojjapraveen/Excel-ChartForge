import React, { useState } from "react";

const ChartSelection = ({ columns, onChartSelected }) => {
  const [chartType, setChartType] = useState("");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  const handleChartSubmit = () => {
    if (chartType && xAxis && yAxis) {
      onChartSelected({ chartType, xAxis, yAxis });
    }
  };

  return (
    <div className="chart-selection">
      <h3>Chart Type</h3>
      <select onChange={(e) => setChartType(e.target.value)}>
        <option value="">Choose Chart Type</option>
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="line">Line Chart</option>
        <option value="column">Column Chart</option>
        <option value="area">Area Chart</option>
        <option value="bubble">Bubble Chart</option>
        <option value="scatter">Scatter Chart</option>
      </select>

      <h3>X-Axis</h3>
      <select onChange={(e) => setXAxis(e.target.value)}>
        <option value="">Choose Column</option>
        {columns.map((col, index) => (
          <option key={index} value={col}>{col}</option>
        ))}
      </select>

      <h3>Y-Axis</h3>
      <select onChange={(e) => setYAxis(e.target.value)}>
        <option value="">Choose Column</option>
        {columns.map((col, index) => (
          <option key={index} value={col}>{col}</option>
        ))}
      </select>

      <button onClick={handleChartSubmit}>Generate</button>
    </div>
  );
};

export default ChartSelection;