import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Bar } from "react-chartjs-2";

function MonthlyAverages() {
  const [data, setData] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the list of commodities
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.get("/filter-data"); // Assuming this endpoint returns metadata
        const uniqueCommodities = [...new Set(response.data.map((item) => item.Commodity))];
        setCommodities(uniqueCommodities);
      } catch (err) {
        console.error("Error fetching commodities:", err);
        setError("Failed to load commodities.");
      }
    };

    fetchCommodities();
  }, []);

  // Fetch monthly averages for the selected commodity
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCommodity) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/visualization/monthly-averages", {
          params: { commodity: selectedCommodity },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching monthly averages:", err);
        setError("Failed to load monthly averages.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCommodity]);

  const chartData = {
    labels: data.map((item) => item.Month), // x-axis: months
    datasets: [
      {
        label: "Average Modal Price (₹)", // y-axis label
        data: data.map((item) => item.Modal_Price), // y-axis: prices
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Modal Price (₹)",
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Monthly Averages Visualization</h2>

      {/* Commodity Selector */}
      <div className="flex justify-center mb-6">
        <select
          className="w-full md:w-1/4 p-2 border rounded"
          value={selectedCommodity}
          onChange={(e) => setSelectedCommodity(e.target.value)}
        >
          <option value="">Select Commodity</option>
          {commodities.map((commodity, idx) => (
            <option key={idx} value={commodity}>
              {commodity}
            </option>
          ))}
        </select>
      </div>

      {/* Chart or Loading/Error Messages */}
      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : data.length > 0 ? (
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-center">No data available. Please select a commodity.</p>
      )}
    </div>
  );
}

export default MonthlyAverages;
