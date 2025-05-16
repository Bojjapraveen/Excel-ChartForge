import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar, Pie, Line, Scatter, Bubble } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Title,ChartDataLabels);

// Function to generate unique colors dynamically
const generateColors = (num) => {
  return Array.from({ length: num }, (_, i) => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
};

// Function to process data and format it for different chart types
const processData = (excelData, xAxis, yAxis, chartType) => {
  const xIndex = excelData[0].indexOf(xAxis);
  const yIndex = excelData[0].indexOf(yAxis);

  if (chartType === "bubble" || chartType === "scatter") {
    return {
      datasets: [
        {
          label: `${yAxis} vs ${xAxis}`,
          data: excelData.slice(1).map((row) => ({
            x: parseFloat(row[xIndex]) || 0,
            y: parseFloat(row[yIndex]) || 0,
            r: chartType === "bubble" ? Math.random() * 10 + 3 : undefined, // Randomized bubble size
          })),
          backgroundColor: generateColors(excelData.length - 1),
          borderColor: "rgb(253, 251, 251)",
          borderWidth: 2,
        },
      ],
    };
  }

  // Default aggregation for Bar, Pie, Line, Column, Area charts
  const aggregatedData = {};
  excelData.slice(1).forEach((row) => {
    const category = row[xIndex];
    const value = parseFloat(row[yIndex]) || 0;
    aggregatedData[category] = (aggregatedData[category] || 0) + value;
  });

  return {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: `${yAxis} per ${xAxis}`,
        data: Object.values(aggregatedData),
        backgroundColor: generateColors(Object.keys(aggregatedData).length),
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
        fill: chartType === "area", 
        innerHeight: chartType === " " ? 0.5 : undefined, // Adjust inner height for pie chart
        
      },
    ],
  };
};

const ChartDisplay = ({ selectedChart, excelData }) => {
  if (!selectedChart || excelData.length < 2) return null;

  const chartData = processData(excelData, selectedChart.xAxis, selectedChart.yAxis, selectedChart.chartType);

  const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
     title: selectedChart.chartType === "pie"
      ? { 
          display: true, 
          text: `${selectedChart.yAxis} per ${selectedChart.xAxis} `, // ✅ Pie chart-specific title
          font: { size: 16, weight: "bold" },
          padding: { bottom: 15 }, // ✅ Adds space below title
        }
      : undefined, // No title for other charts



    
    datalabels: { // ✅ Enable value labels
      anchor: "end",
      align: "top",
      formatter: (value) => value.toLocaleString(), // ✅ Formats values with commas
      font: { size: 14, weight: "bold" },
      color: "#000", // ✅ Label color
      padding: {
        bottom: 1, // ✅ Adds space below the title
      },

            
    },
  },
  scales: selectedChart.chartType !== "pie"
    ? {
        x: {
          title: { display: true, text: selectedChart.xAxis, font: { size: 10, weight: "bold" } },
        },
        y: {
          title: { display: true, text: selectedChart.yAxis, font: { size: 10, weight: "bold" } },
          ticks: {
            autoSkip: false,
            maxTicksLimit: 5,
            callback: function(value) {
              return value.toLocaleString(); // ✅ Adds commas for readability
            },
          },
        },
      }
    : undefined, // No axes for Pie chart
};
  

  return (
    <div className="chart-container">
      {/* <h3>Generated {selectedChart.chartType} Chart</h3> */}
      {selectedChart.chartType === "bar" && <Bar data={chartData} options={chartOptions} />}
      {selectedChart.chartType === "pie" && <Pie data={chartData} options={chartOptions} />}
      {selectedChart.chartType === "line" && <Line data={chartData} options={chartOptions} />}
      {selectedChart.chartType === "column" && <Bar data={chartData} options={chartOptions} />}
      {selectedChart.chartType === "area" && <Line data={chartData} options={{ ...chartOptions, elements: { line: { fill: true } } }} />}
      {selectedChart.chartType === "bubble" && <Bubble data={chartData} options={chartOptions} />}
      {selectedChart.chartType === "scatter" && <Scatter data={chartData} options={chartOptions} />}
    </div>
  );
};

export default ChartDisplay;