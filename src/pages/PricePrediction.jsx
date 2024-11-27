import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Line } from "react-chartjs-2";

function PricePrediction() {
  const [commodities, setCommodities] = useState([]); // List of commodities
  const [selectedCommodity, setSelectedCommodity] = useState(""); // Selected commodity
  const [predictions, setPredictions] = useState([]); // Predicted prices
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch commodities on component mount
  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        const response = await axios.get("/filter-data"); // Fetch commodities from the backend
        const uniqueCommodities = [...new Set(response.data.map((item) => item.Commodity))];
        setCommodities(uniqueCommodities);
      } catch (err) {
        console.error("Error fetching commodities:", err);
        setError("Failed to fetch commodities. Please try again later.");
      }
    };

    fetchCommodities();
  }, []);

  // Fetch predictions
  const fetchPredictions = async () => {
    if (!selectedCommodity) {
      setError("Please select a commodity.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/predict?commodity=${encodeURIComponent(selectedCommodity)}`);
      console.log("Predictions:", response.data.predictions);
      setPredictions(response.data.predictions);
    } catch (err) {
      console.error("Error fetching predictions:", err);
      setError("Failed to fetch predictions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Chart data
  const chartData = {
    labels: predictions.map((_, index) => `Day ${index + 1}`), // X-axis labels: Day 1, Day 2, ...
    datasets: [
      {
        label: `Predicted Prices for ${selectedCommodity}`,
        data: predictions,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="card">
        <div className="card-header">
          <h2 className="text-3xl font-bold text-center">Price Prediction</h2>
          <p className="text-center">Select a commodity to view predicted prices for the next 30 days.</p>
        </div>
        <div className="card-content">
          {/* Commodity Selector */}
          <div className="mb-6">
            <label htmlFor="commodity" className="block mb-2 text-lg font-medium text-gray-700">
              Select Commodity:
            </label>
            <select
              id="commodity"
              className="w-full p-2 border rounded"
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
            >
              <option value="">Select a commodity</option>
              {commodities.map((commodity, index) => (
                <option key={index} value={commodity}>
                  {commodity}
                </option>
              ))}
            </select>
          </div>

          {/* Fetch Predictions Button */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
            onClick={fetchPredictions}
            disabled={loading}
          >
            {loading ? "Fetching Predictions..." : "Get Predictions"}
          </button>

          {/* Error Message */}
          {error && <div className="alert alert-destructive mb-6">{error}</div>}

          {/* Line Chart */}
          {predictions.length > 0 && (
            <div className="chart-container">
              <Line data={chartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PricePrediction;