import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Line } from "react-chartjs-2";
import { Loader2 } from "lucide-react";

function StatePrices() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch states and commodities
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/filter-data");
        setStates([...new Set(response.data.map((item) => item.State))]);
        setCommodities([...new Set(response.data.map((item) => item.Commodity))]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching metadata:", err);
        setError("Failed to fetch states and commodities.");
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  // Fetch state prices over time
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCommodity) return;
      try {
        setLoading(true);
        setError(null);
        const params = { commodity: selectedCommodity };
        const response = await axios.get("/visualization/state-prices", { params });
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Invalid response format:", response.data);
          setError("Invalid data format received from server.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching state prices:", err);
        setError("Failed to fetch state prices.");
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCommodity]);

  // Filter data by selected state
  useEffect(() => {
    if (Array.isArray(data)) {
      if (selectedState) {
        setFilteredData(data.filter((item) => item.State === selectedState));
      } else {
        setFilteredData(data);
      }
    } else {
      setFilteredData([]);
    }
  }, [data, selectedState]);

  // Prepare data for the chart
  const chartData = {
    labels: Array.isArray(filteredData)
      ? filteredData.map((item) => new Date(item.Date).toLocaleDateString()) // Format the date
      : [],
    datasets: [
      {
        label: `Average Prices in ${selectedState || "All States"}`,
        data: Array.isArray(filteredData)
          ? filteredData.map((item) => item.Average_Price)
          : [],
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">State Prices Over Time</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
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

        <select
          className="w-full md:w-1/4 p-2 border rounded"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">All States</option>
          {states.map((state, idx) => (
            <option key={idx} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Loading, Error, or Chart */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          <h4 className="font-bold">Error</h4>
          <p>{error}</p>
        </div>
      ) : Array.isArray(filteredData) && filteredData.length > 0 ? (
        <div className="chart-container">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                tooltip: { mode: "index" },
                legend: { display: true },
              },
              scales: {
                x: { title: { display: true, text: "Date" } },
                y: { title: { display: true, text: "Average Price (₹)" } },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center">No data to display.</p>
      )}
    </div>
  );
}

export default StatePrices;