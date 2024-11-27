import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Bar } from "react-chartjs-2";

function AnalyzeMarkets() {
  const [data, setData] = useState({ lowest: {}, highest: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/analysis/markets");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching market prices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: [...Object.keys(data.lowest), ...Object.keys(data.highest)],
    datasets: [
      {
        label: "Lowest Prices",
        data: Object.values(data.lowest),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Highest Prices",
        data: Object.values(data.highest),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Market with highest and lowest prices</h2>
      {loading ? <p>Loading...</p> : <Bar data={chartData} />}
    </div>
  );
}

export default AnalyzeMarkets;
