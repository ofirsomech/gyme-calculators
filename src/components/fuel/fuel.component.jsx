import React, { useState } from 'react';
import TableComponent from "../table/table.component";
import './fuel.css'; // Import your CSS file for styling

const FuelCalculator = () => {
  const [distance, setDistance] = useState(20); // Example default value
  const [fuelEfficiency, setFuelEfficiency] = useState(12); // Example default value
  const [selfServicePrice, setSelfServicePrice] = useState(7.48); // Example default value
  const [fullServicePrice, setFullServicePrice] = useState(7.70); // Example default value

  const fuelNeeded = distance / fuelEfficiency;
  const totalSelfService = fuelNeeded * selfServicePrice;
  const totalFullService = fuelNeeded * fullServicePrice;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg rtl">
      <h2 className="text-2xl font-bold mb-6 text-center">מחושב דלק</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700">מרחק בק״מ</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">צריכת דלק ברכב ק״מ / ליטר</label>
          <input
            type="number"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(parseFloat(e.target.value))}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">שרות עצמי (₪/ל)</label>
          <input
            type="number"
            value={selfServicePrice}
            onChange={(e) => setSelfServicePrice(parseFloat(e.target.value))}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">שרות מלא (₪/ל)</label>
          <input
            type="number"
            value={fullServicePrice}
            onChange={(e) => setFullServicePrice(parseFloat(e.target.value))}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4 col-span-1 md:col-span-2">
          <label className="block text-gray-700">סכום הדלק לשירות עצמי</label>
          <input
            type="text"
            value={totalSelfService.toFixed(2)}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div className="mb-4 col-span-1 md:col-span-2">
          <label className="block text-gray-700">סכום הדלק לשירות מלא</label>
          <input
            type="text"
            value={totalFullService.toFixed(2)}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>
      </div>

      <div className="mt-8">
        <TableComponent />
      </div>
    </div>
  );
};

export default FuelCalculator;
