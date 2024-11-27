import React, { useEffect, useState } from "react";
import axios from "../../axios";

function AnalyzeMonthlyPrice() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commodities, setCommodities] = useState([]); // List of available commodities
  const [selectedCommodity, setSelectedCommodity] = useState(""); // Selected commodity

  // Fetch initial data (commodities list)
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.get("/filter-data");
        const uniqueCommodities = [...new Set(response.data.map((item) => item.Commodity))];
        setCommodities(uniqueCommodities);
      } catch (error) {
        console.error("Error fetching commodities:", error);
        setError("Failed to load commodities.");
      }
    };
    fetchCommodities();
  }, []);

  // Fetch monthly prices for the selected commodity
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCommodity) return;
      setLoading(true);
      setError(null);
      try {
        // Use POST request to fetch data
        const response = await axios.get(`/analysis/commodity/${selectedCommodity}/monthly`, {
          commodity: selectedCommodity,
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching monthly prices:", err);
        setError("Failed to load monthly prices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCommodity]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Monthly Average Prices</h2>

      {/* Commodity Selector */}
      <div className="mb-6">
        <label htmlFor="commodity" className="block text-lg font-medium text-gray-700">
          Select Commodity
        </label>
        <select
          id="commodity"
          className="w-full p-2 border rounded"
          value={selectedCommodity}
          onChange={(e) => setSelectedCommodity(e.target.value)}
        >
          <option value="">-- Select a Commodity --</option>
          {commodities.map((commodity, index) => (
            <option key={index} value={commodity}>
              {commodity}
            </option>
          ))}
        </select>
      </div>

      {/* Display Monthly Data */}
      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : !selectedCommodity ? (
        <p className="text-center text-gray-500">Please select a commodity to view data.</p>
      ) : Object.keys(data).length === 0 ? (
        <p className="text-center text-gray-500">No data available for the selected commodity.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Price for {selectedCommodity}</h3>
          <ul className="list-disc pl-6">
            {Object.entries(data).map(([month, avgPrice]) => {
              const monthName = new Date(2024, month - 1).toLocaleString("default", { month: "long" });
              return (
                <li key={month} className="mb-2">
                  <strong>{monthName}:</strong> ₹{avgPrice.toFixed(2)}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-gray-700">
            This data represents the average modal price of <strong>{selectedCommodity}</strong> for each month.
          </p>
        </div>
      )}
    </div>
  );
}

export default AnalyzeMonthlyPrice;
