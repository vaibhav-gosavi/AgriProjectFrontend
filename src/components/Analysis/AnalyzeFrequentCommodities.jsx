import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Bar } from "react-chartjs-2";

function AnalyzeFrequentCommodities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/analysis/frequent-commodities");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching frequent commodities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Frequency of Commodities",
        data: Object.values(data),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Frequent Commodities</h2>
      {loading ? <p>Loading...</p> : <Bar data={chartData} />}
    </div>
  );
}

export default AnalyzeFrequentCommodities;
