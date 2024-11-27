import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Line } from "react-chartjs-2";

function AnalyzePriceTrends({ selectedCommodity }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCommodity) return;
      try {
        const response = await axios.get(`/analysis/commodity/${selectedCommodity}/trends`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching price trends:", err);
        setError("Failed to load price trends.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCommodity]);

  const chartData = {
    labels: data.map((item) => new Date(item.Date).toLocaleDateString()),
    datasets: [
      {
        label: `Price Trends for ${selectedCommodity}`,
        data: data.map((item) => item.Modal_Price),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Price Trends</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <Line data={chartData} />}
    </div>
  );
}

export default AnalyzePriceTrends;
