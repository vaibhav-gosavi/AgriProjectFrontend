import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Pie } from "react-chartjs-2";

function AnalyzeStateCommodities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/analysis/state-commodities");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching state commodities:", err);
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
        label: "Number of Commodities",
        data: Object.values(data),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4caf50"],
      },
    ],
  };

  return (
    <div>
      <h2>States with Most Commodities</h2>
      {loading ? <p>Loading...</p> : <Pie data={chartData} />}
    </div>
  );
}

export default AnalyzeStateCommodities;
