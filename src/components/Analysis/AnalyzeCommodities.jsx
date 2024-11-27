import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Bar } from "react-chartjs-2";

function AnalyzeCommodities() {
  const [data, setData] = useState({ cheapest: {}, expensive: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/analysis/commodities");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching commodities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(data.expensive),
    datasets: [
      {
        label: "Average Price (Expensive)",
        data: Object.values(data.expensive),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Average Price (Cheapest)",
        data: Object.values(data.cheapest),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Top Commodities performed in country </h2>
      {loading ? <p>Loading...</p> : <Bar data={chartData} />}
    </div>
  );
}

export default AnalyzeCommodities;
