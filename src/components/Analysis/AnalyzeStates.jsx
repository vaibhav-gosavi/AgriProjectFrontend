import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Pie } from "react-chartjs-2";

function AnalyzeStates() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/analysis/states");
        setData(response.data.top_states_by_price);
      } catch (error) {
        console.error("Error fetching states:", error);
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
        label: "Average Price",
        data: Object.values(data),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
      },
    ],
  };

  return (
    <div>
      <h2>Top States by Profit and price </h2>
      {loading ? <p>Loading...</p> : <Pie data={chartData} />}
    </div>
  );
}

export default AnalyzeStates;
