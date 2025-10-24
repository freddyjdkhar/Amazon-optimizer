import React from "react";

function ComparisonView({ data }) {
  if (!data) return null;

  return (
    <div className="comparison-view">
      <div className="comparison-header">
        <h2>Optimization Results for ASIN: {data.asin}</h2>
        <p className="comparison-subtitle">
          Compare original vs AI-optimized content
        </p>
      </div>

      {/* Title Comparison */}
      <div className="comparison-section">
        <h3>📝 Product Title</h3>
        <div className="comparison-grid">
          <div className="comparison-card original">
            <h4>Original</h4>
            <p className="content">{data.original.title}</p>
            <div className="meta">
              <span className="badge">
                {data.original.title.length} characters
              </span>
            </div>
          </div>
          <div className="comparison-card optimized">
            <h4>Optimized</h4>
            <p className="content">{data.optimized.title}</p>
            <div className="meta">
              <span className="badge success">
                {data.optimized.title.length} characters
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bullet Points Comparison */}
      <div className="comparison-section">
        <h3>📌 Bullet Points</h3>
        <div className="comparison-grid">
          <div className="comparison-card original">
            <h4>Original</h4>
            <ul className="bullet-list">
              {data.original.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            <div className="meta">
              <span className="badge">
                {data.original.bullets.length} bullets
              </span>
            </div>
          </div>
          <div className="comparison-card optimized">
            <h4>Optimized</h4>
            <ul className="bullet-list">
              {data.optimized.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            <div className="meta">
              <span className="badge success">
                {data.optimized.bullets.length} bullets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Comparison */}
      <div className="comparison-section">
        <h3>📄 Product Description</h3>
        <div className="comparison-grid">
          <div className="comparison-card original">
            <h4>Original</h4>
            <p className="content description">{data.original.description}</p>
            <div className="meta">
              <span className="badge">
                {data.original.description.length} characters
              </span>
            </div>
          </div>
          <div className="comparison-card optimized">
            <h4>Optimized</h4>
            <p className="content description">{data.optimized.description}</p>
            <div className="meta">
              <span className="badge success">
                {data.optimized.description.length} characters
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="comparison-section">
        <h3>🔍 Suggested Keywords</h3>
        <div className="keywords-container">
          {data.optimized.keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={() => navigator.clipboard.writeText(data.optimized.title)}
          className="copy-btn"
        >
          Copy Title
        </button>
        <button
          onClick={() =>
            navigator.clipboard.writeText(data.optimized.bullets.join("\n"))
          }
          className="copy-btn"
        >
          Copy Bullets
        </button>
        <button
          onClick={() =>
            navigator.clipboard.writeText(data.optimized.description)
          }
          className="copy-btn"
        >
          Copy Description
        </button>
      </div>
    </div>
  );
}

export default ComparisonView;
