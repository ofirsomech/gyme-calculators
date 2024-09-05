import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLastFuelPrice, setLastFullServicePrice } from "../../store/actions";
import FuelCalculator from '../fuel-calculator/fuel-calculator.component';
import TableComponent from '../table/table.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../navbar/navbar.component';
import CompoundInterestCalculator from '../compound-interest-calculator/compound-interest-calculator.component';

const fetchData = async () => {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vSk59G4dOQYP3xaeiNPAc5YeIN4nc3kuQ5Qr4mbdKqjt1lz1-IMaXeEJp-FuxMq2E9sEZ7SudYomYbg/pubhtml/sheet?headers=false&gid=0&pli=1"
  );
  const text = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  const table = doc.querySelector("table");

  if (!table) throw new Error("Table not found in the HTML.");

  const rows = Array.from(table.querySelectorAll("tr"));
  const data = rows.map((row) => {
    const cells = Array.from(row.querySelectorAll("td")).map(
      (cell) => cell.textContent?.trim() || ""
    );
    return cells;
  });

  return data;
};

const FuelApp = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const fetchedData = await fetchData();
          setData(fetchedData);
  
          if (fetchedData[3] && fetchedData[3][1] && fetchedData[3][2]) {
            const selfServicePrice = parseFloat(fetchedData[3][1]);
            const fullServiceAddition = parseFloat(fetchedData[3][2]);
            const fullServicePrice = selfServicePrice + fullServiceAddition;
  
            dispatch(setLastFuelPrice(selfServicePrice.toFixed(2)));
            dispatch(setLastFullServicePrice(fullServicePrice.toFixed(2)));
          }
  
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      };
  
      loadData();
    }, [dispatch]);
  
    if (isLoading) {
      return <div className="text-center mt-10">טוען נתונים...</div>;
    }
  

    return (
        <Router>
          <div className="max-w-6xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg rtl">
            <NavBar />
            <Routes>
              <Route path="/" element={
                <>
                  <FuelCalculator />
                  <TableComponent data={data} />
                </>
              } />
              <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
            </Routes>
          </div>
        </Router>
      );
    };
  
  export default FuelApp;