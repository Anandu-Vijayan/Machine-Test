import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const res = await axios.get('http://localhost:4000/api/admin/metrics', {
        params: { from, to },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setMetrics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (from && to) {
      fetchMetrics();
    }
  }, [from, to]);

  // Initialize labels and dataValues
  const labels = [];
  const dataValues = {};

  // Loop through the metrics array to populate labels and dataValues
  metrics.forEach(metric => {
    const { bikeType } = metric;

    // If bikeType is not in labels array, add it and initialize its count to 1
    if (!labels.includes(bikeType)) {
      labels.push(bikeType);
      dataValues[bikeType] = 1;
    } else {
      // If bikeType already exists in dataValues, increment its count
      dataValues[bikeType]++;
    }
  });

  // Generate an array of strings in the format "BikeType: Count"
  const chartLabels = labels.map(bikeType => `${bikeType}: ${dataValues[bikeType]}`);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Number of Bikes Assembled',
        data: labels.map(bikeType => dataValues[bikeType]), // Map counts based on labels
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="from" className="block text-gray-700 text-sm font-bold mb-2">
            From
          </label>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="to" className="block text-gray-700 text-sm font-bold mb-2">
            To
          </label>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
