import React, { useState } from "react";

function OptimizationForm({ onOptimize, loading }) {
  const [asin, setAsin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (asin.trim()) {
      onOptimize(asin.trim().toUpperCase());
    }
  };

  return (
    <div className="optimization-form">
      <h2>Enter Amazon ASIN</h2>
      <p className="subtitle">
        Enter a valid Amazon ASIN (e.g., B08N5WRWNW) to optimize the product
        listing
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter ASIN (e.g., B08N5WRWNW)"
            value={asin}
            onChange={(e) => setAsin(e.target.value)}
            maxLength="10"
            pattern="[A-Z0-9]{10}"
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Optimizing...
              </>
            ) : (
              "Optimize Listing"
            )}
          </button>
        </div>
      </form>

      <div className="info-box">
        <h3>How it works:</h3>
        <ol>
          <li>Enter a valid Amazon ASIN</li>
          <li>We fetch the product details from Amazon</li>
          <li>AI analyzes and optimizes the listing</li>
          <li>View original vs optimized side-by-side</li>
          <li>All results are saved for future reference</li>
        </ol>
      </div>

      <div className="examples">
        <h3>Example ASINs to try:</h3>
        <div className="example-buttons">
          <button
            onClick={() => setAsin("B08N5WRWNW")}
            disabled={loading}
            className="example-btn"
          >
            B08N5WRWNW
          </button>
          <button
            onClick={() => setAsin("B0B1Y7KX7F")}
            disabled={loading}
            className="example-btn"
          >
            B0B1Y7KX7F
          </button>
          <button
            onClick={() => setAsin("B09G9FPHY6")}
            disabled={loading}
            className="example-btn"
          >
            B09G9FPHY6
          </button>
        </div>
      </div>
    </div>
  );
}

export default OptimizationForm;
