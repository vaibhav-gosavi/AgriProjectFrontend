import React, { useState, useEffect } from "react";
import axios from "../axios";
import Loader from "../components/Loader.jsx"; // Correct relative path

function FilterData() {
  const [states, setStates] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch initial data (states list)
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/filter-data");
        const uniqueStates = [...new Set(response.data.map((item) => item.State))];
        setStates(uniqueStates);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  const filterData = async () => {
    try {
      setLoading(true);
      const params = { state: selectedState || undefined };
      const response = await axios.get("/filter-data", { params });
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error filtering data:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = async () => {
    try {
      setLoading(true);
      const params = { state: selectedState, export: true };
      const response = await axios.get("/filter-data", {
        params,
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${selectedState || "all_states"}_data.csv`;
      link.click();
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Filter and Export Data by State</h1>

      <div className="mb-6">
        <label className="block text-gray-700">State</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">All States</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={filterData}
        >
          Apply Filter
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={exportData}
        >
          Export Data
        </button>
      </div>

      <div className="overflow-auto">
        {loading ? (
          <Loader /> // Use the Loader component
        ) : filteredData.length === 0 ? (
          <p className="text-center text-gray-500">No data found for the selected state.</p>
        ) : (
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">State</th>
                <th className="p-2">District</th>
                <th className="p-2">Market</th>
                <th className="p-2">Commodity</th>
                <th className="p-2">Arrival Date</th>
                <th className="p-2">Min Price</th>
                <th className="p-2">Max Price</th>
                <th className="p-2">Modal Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2">{item.State}</td>
                  <td className="p-2">{item.District}</td>
                  <td className="p-2">{item.Market}</td>
                  <td className="p-2">{item.Commodity}</td>
                  <td className="p-2">{item.Arrival_Date}</td>
                  <td className="p-2">{item.Min_x0020_Price}</td>
                  <td className="p-2">{item.Max_x0020_Price}</td>
                  <td className="p-2">{item.Modal_x0020_Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FilterData;
