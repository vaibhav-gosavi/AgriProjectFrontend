import React, { useState } from "react";
import AnalyzeCommodities from "./AnalyzeCommodities";
import AnalyzeStates from "./AnalyzeStates";
import AnalyzeSeasonal from "./AnalyzeSeasonal";
import AnalyzeMonthlyPrice from "./AnalyzeMonthlyPrice";
import AnalyzeFrequentCommodities from "./AnalyzeFrequentCommodities";
import AnalyzeStateCommodities from "./AnalyzeStateCommodities";
import AnalyzePriceTrends from "./AnalyzePriceTrends";
import AnalyzeCorrelations from "./AnalyzeCorrelations";
import AnalyzeMarkets from "./AnalyzeMarkets";

function AnalysisTabs() {
  const [activeTab, setActiveTab] = useState("commodities");

  const renderContent = () => {
    switch (activeTab) {
      case "commodities":
        return <AnalyzeCommodities />;
      case "states":
        return <AnalyzeStates />;
      case "seasonal":
        return <AnalyzeSeasonal />;
      case "monthly":
        return <AnalyzeMonthlyPrice />;
      case "frequent":
        return <AnalyzeFrequentCommodities />;
      case "stateCommodities":
        return <AnalyzeStateCommodities />;
      case "trends":
        return <AnalyzePriceTrends />;
      case "correlations":
        return <AnalyzeCorrelations />;
      case "markets":
        return <AnalyzeMarkets />;
      default:
        return <AnalyzeCommodities />;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="tabs mb-4">
        {[
          { key: "commodities", label: "Commodities" },
          { key: "states", label: "States" },
          { key: "seasonal", label: "Seasonal Trends" },
          { key: "monthly", label: "Monthly Prices" },
          { key: "frequent", label: "Frequent Commodities" },
          { key: "stateCommodities", label: "State Commodities" },
          { key: "correlations", label: "Correlations" },
          { key: "markets", label: "Markets" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-4 ${
              activeTab === tab.key ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

export default AnalysisTabs;
