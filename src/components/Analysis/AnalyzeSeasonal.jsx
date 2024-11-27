import React, { useEffect, useState } from "react";
import axios from "../../axios";

function AnalyzeSeasonal() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/analysis/seasonal");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching seasonal trends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Seasonal Trends Analysis</h2>
      {loading ? (
        <p>Loading seasonal trends data...</p>
      ) : (
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Monthly Average Modal Prices</h3>
          <ul className="list-disc pl-6">
            {Object.entries(data).map(([month, value]) => (
              <li key={month} className="mb-2">
                <strong>Month {month}:</strong> ₹{value.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-gray-700">
            <strong>Explanation:</strong> This analysis shows the average modal price of the commodity for each month,
            derived from historical data. For instance, if "Month 1" (January) shows a value of ₹5000, it means the
            average price for that month across all records is ₹5000. This can help identify patterns like seasonal
            price spikes or drops.
          </p>
        </div>
      )}
    </div>
  );
}

export default AnalyzeSeasonal;
