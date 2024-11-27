import  { useState } from "react";
import axios from "../axios";


function RealTimePriceMonitoring() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/fetch-data");
      setData(response.data); // Ensure the backend returns the data fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch real-time data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Real-time Price Monitoring</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Latest Data"}
      </button>

      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>District</th>
              <th>Market</th>
              <th>Commodity</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Modal Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.State}</td>
                <td>{item.District}</td>
                <td>{item.Market}</td>
                <td>{item.Commodity}</td>
                <td>{item.Min_Price}</td>
                <td>{item.Max_Price}</td>
                <td>{item.Modal_Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RealTimePriceMonitoring;
