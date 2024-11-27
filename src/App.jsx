import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import FilterData from "./pages/FilterData";
import MarketTrends from "./pages/MarketTrends";
import StatePrices from "./pages/StatePrices";
import MonthlyAverages from "./pages/MonthlyAverages";
import HistoricalData from "./pages/HistoricalVisualization";
import PricePrediction from "./pages/PricePrediction";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/filter-data" element={<FilterData />} />
            <Route path="/historical-data" element={<HistoricalData />} />
            <Route path="/market-trends" element={<MarketTrends />} />
            <Route path="/state-prices" element={<StatePrices />} />
            <Route path="/monthly-averages" element={<MonthlyAverages />} />
            <Route path="/price-prediction" element={<PricePrediction />} />
            <Route path="/analysis" element={<AnalysisPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
