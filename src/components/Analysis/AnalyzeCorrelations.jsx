import React, { useEffect, useState } from "react";
import axios from "../../axios";

function AnalyzeCorrelations() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/analysis/correlations");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching correlations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Price Correlations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Metric</th>
              {Object.keys(data).map((key) => (
                <th key={key} className="border border-gray-400 px-4 py-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, values]) => (
              <tr key={key}>
                <td className="border border-gray-400 px-4 py-2">{key}</td>
                {Object.values(values).map((value, idx) => (
                  <td key={idx} className="border border-gray-400 px-4 py-2">
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AnalyzeCorrelations;
