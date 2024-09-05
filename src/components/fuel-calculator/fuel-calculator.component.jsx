import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const FuelCalculator = () => {
  const [distance, setDistance] = useState(20);
  const [fuelEfficiency, setFuelEfficiency] = useState(12);
  const [selfServicePrice, setSelfServicePrice] = useState(null);
  const [fullServicePrice, setFullServicePrice] = useState(null);

  const lastFuelPrice = useSelector(state => state.lastFuelPrice);
  const lastFullServicePrice = useSelector(state => state.lastFullServicePrice);

  useEffect(() => {
    if (lastFuelPrice !== null) {
      setSelfServicePrice(parseFloat(lastFuelPrice));
    }
    if (lastFullServicePrice !== null) {
      setFullServicePrice(parseFloat(lastFullServicePrice));
    }
  }, [lastFuelPrice, lastFullServicePrice]);

  const fuelNeeded = distance / fuelEfficiency;
  const totalSelfService = fuelNeeded * (selfServicePrice || 0);
  const totalFullService = fuelNeeded * (fullServicePrice || 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">מחשבון דלק</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700">מרחק בק״מ</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">צריכת דלק ברכב ק״מ / ליטר</label>
          <input
            type="number"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(parseFloat(e.target.value) || 1)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">שרות עצמי (₪/ל)</label>
          <input
            type="number"
            value={selfServicePrice}
            className="w-full p-2 border rounded-lg"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">שרות מלא (₪/ל)</label>
          <input
            type="number"
            value={fullServicePrice}
            className="w-full p-2 border rounded-lg"
            readOnly
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
    </div>
  );
};

export default FuelCalculator;