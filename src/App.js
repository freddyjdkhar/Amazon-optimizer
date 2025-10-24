import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import OptimizationForm from "./components/OptimizationForm";
import ComparisonView from "./components/ComparisonView";
import HistoryView from "./components/HistoryView";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("optimize");
  const [history, setHistory] = useState([]);

  const handleOptimize = async (asin) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("/api/optimize", { asin });
      setResult(response.data);
      setActiveTab("results");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to optimize product listing"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (asin = null) => {
    try {
      const url = asin ? `/api/history/${asin}` : "/api/history";
      const response = await axios.get(url);
      setHistory(response.data);
      setActiveTab("history");
    } catch (err) {
      setError("Failed to load history");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Amazon Product Listing Optimizer</h1>
        <p>Optimize your Amazon listings with AI-powered suggestions</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "optimize" ? "active" : ""}
          onClick={() => setActiveTab("optimize")}
        >
          Optimize
        </button>
        <button
          className={activeTab === "results" ? "active" : ""}
          onClick={() => setActiveTab("results")}
          disabled={!result}
        >
          Results
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => loadHistory()}
        >
          History
        </button>
      </nav>

      <main className="App-main">
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {activeTab === "optimize" && (
          <OptimizationForm onOptimize={handleOptimize} loading={loading} />
        )}

        {activeTab === "results" && result && <ComparisonView data={result} />}

        {activeTab === "history" && (
          <HistoryView history={history} onLoadAsinHistory={loadHistory} />
        )}
      </main>

      <footer className="App-footer">
        <p>Built with Node.js, React, MySQL, and OpenAI</p>
      </footer>
    </div>
  );
}

export default App;
