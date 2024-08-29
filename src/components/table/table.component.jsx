import React, { useEffect, useState } from 'react';
import './Table.css'; // Import your CSS file for styling

// Function to fetch and parse data from Google Sheets
const fetchData = async () => {
    const response = await fetch('https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vSk59G4dOQYP3xaeiNPAc5YeIN4nc3kuQ5Qr4mbdKqjt1lz1-IMaXeEJp-FuxMq2E9sEZ7SudYomYbg/pubhtml/sheet?headers=false&gid=0&pli=1');
    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const table = doc.querySelector('table');

    if (!table) throw new Error('Table not found in the HTML.');

    const rows = Array.from(table.querySelectorAll('tr'));
    const data = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(cell => cell.textContent?.trim() || '');
        return cells;
    });

    return data;
};

const TableComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        loadData();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg rtl">
            <h2 className="text-2xl font-bold mb-4 text-center">Data Table</h2>

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
