import React, { useState } from "react";
import * as XLSX from "xlsx";

const UploadComponent = ({ onDataExtracted }) => {
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length > 0) {
        setColumns(jsonData[0]); // Extract column names
        onDataExtracted(jsonData);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
  <div className="upload-container">
    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    <h3>Columns Detected:</h3>
    <div className="column-list">
      {columns.map((col, index) => (
        <div key={index} className="column-item">
          {col}
        </div>
      ))}
    </div>
  </div>
);
};

export default UploadComponent;