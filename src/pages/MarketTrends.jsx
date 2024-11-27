import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Loader2 } from "lucide-react";

function MarketTrends() {
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState([]);

  // Fetch commodities for dropdown
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.get("/filter-data");
        const uniqueCommodities = [
          ...new Set(response.data.map((item) => item.Commodity)),
        ];
        setCommodities(uniqueCommodities);
      } catch (err) {
        console.error("Error fetching commodities:", err);
        setError("Failed to fetch commodities. Please try again later.");
      }
    };

    fetchCommodities();
  }, []);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCommodity) {
        setResponseData([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/visualization/market-trends", {
          params: { commodity: selectedCommodity },
        });
        setResponseData(response.data);
      } catch (err) {
        console.error("Error fetching market trends data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCommodity]);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="card">
        <div className="card-header">
          <h2 className="text-3xl font-bold text-center">Market Trends</h2>
          <p className="text-center">Analyze market trends for various commodities</p>
        </div>
        <div className="card-content">
          {/* Commodity Selector */}
          <div className="mb-6">
            <select
              className="w-full p-2 border rounded"
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
            >
              <option value="">Select a Commodity</option>
              {commodities.map((commodity) => (
                <option key={commodity} value={commodity}>
                  {commodity}
                </option>
              ))}
            </select>
          </div>

          {/* Loading and Error Handling */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            </div>
          ) : error ? (
            <div className="alert alert-destructive">
              <h4>Error</h4>
              <p>{error}</p>
            </div>
          ) : responseData.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">Market Trends Data:</h3>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Market</th>
                    <th className="border border-gray-300 px-4 py-2">Average Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="border border-gray-300 px-4 py-2">{item.Date}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.Market}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.Modal_Price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert">No data available. Select a commodity to view trends.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketTrends;
