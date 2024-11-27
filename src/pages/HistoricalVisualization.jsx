import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function HistoricalData() {
  const [states, setStates] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [data, setData] = useState([]); // Full dataset
  const [filteredData, setFilteredData] = useState([]); // Filtered dataset
  const [selectedState, setSelectedState] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/visualization/historical");
        setData(response.data);
        setFilteredData(response.data); // Load all data initially

        // Extract unique states, commodities, and markets
        const uniqueStates = [...new Set(response.data.map((item) => item.State))];
        const uniqueCommodities = [...new Set(response.data.map((item) => item.Commodity))];
        const uniqueMarkets = [...new Set(response.data.map((item) => item.Market))];

        setStates(uniqueStates);
        setCommodities(uniqueCommodities);
        setMarkets(uniqueMarkets);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle filtering
  const filterData = async () => {
    try {
      const params = {
        state: selectedState || undefined,
        commodity: selectedCommodity || undefined,
        market: selectedMarket || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      };

      const response = await axios.get("/visualization/historical", { params });
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error filtering historical data:", error);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: filteredData.map((item) => item.Date),
    datasets: [
      {
        label: `Average Modal Price`,
        data: filteredData.map((item) => item.Modal_Price),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Historical Data Visualization</h1>

      {/* Filter Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-gray-700">State</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">All States</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Commodity</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
          >
            <option value="">All Commodities</option>
            {commodities.map((commodity, index) => (
              <option key={index} value={commodity}>
                {commodity}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Market</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
          >
            <option value="">All Markets</option>
            {markets.map((market, index) => (
              <option key={index} value={market}>
                {market}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons for Filtering */}
      <div className="flex space-x-4 mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={filterData}
        >
          Apply Filter
        </button>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        {filteredData.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p className="text-center text-gray-500">No data available for the selected filters.</p>
        )}
      </div>

      {/* Data Table */}
      <div className="overflow-auto">
        {filteredData.length === 0 ? (
          <p className="text-center text-gray-500">No data found for the selected filters.</p>
        ) : (
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">State</th>
                <th className="p-2">Market</th>
                <th className="p-2">Commodity</th>
                <th className="p-2">Date</th>
                <th className="p-2">Average Modal Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2">{item.State}</td>
                  <td className="p-2">{item.Market}</td>
                  <td className="p-2">{item.Commodity}</td>
                  <td className="p-2">{item.Date}</td>
                  <td className="p-2">{item.Modal_Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HistoricalData;
