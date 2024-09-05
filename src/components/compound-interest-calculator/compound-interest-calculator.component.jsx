// src/components/CompoundInterestCalculator.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(10);
  const [monthlyDeposit, setMonthlyDeposit] = useState(100);
  const [result, setResult] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, monthlyDeposit]);

  const calculateCompoundInterest = () => {
    let total = principal;
    let data = [];
    for (let year = 0; year <= time; year++) {
      total = (total + monthlyDeposit * 12) * (1 + rate / 100);
      data.push({
        year: year,
        amount: parseFloat(total.toFixed(2))
      });
    }
    setResult(total);
    setChartData(data);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">מחשבון ריבית דריבית</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">סכום התחלתי</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">ריבית שנתית (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">זמן (בשנים)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">הפקדה חודשית</label>
          <input
            type="number"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold">סכום סופי: ₪{result.toFixed(2)}</h3>
      </div>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;