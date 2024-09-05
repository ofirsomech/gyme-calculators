import React from "react";
import "./Table.css";

const TableComponent = ({ data }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">History</h2>
      <div className="overflow-x-auto">
        <table className="styled-table">
          <thead>
            <tr>
              {data[0]?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
