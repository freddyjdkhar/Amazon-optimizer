import React, { useState } from "react";

function HistoryView({ history, onLoadAsinHistory }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchAsin, setSearchAsin] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAsin.trim()) {
      onLoadAsinHistory(searchAsin.trim().toUpperCase());
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="history-view">
      <div className="history-header">
        <h2>Optimization History</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by ASIN"
            value={searchAsin}
            onChange={(e) => setSearchAsin(e.target.value)}
            maxLength="10"
          />
          <button type="submit">Search</button>
          <button
            type="button"
            onClick={() => {
              setSearchAsin("");
              onLoadAsinHistory();
            }}
          >
            Show All
          </button>
        </form>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <p>No optimization history found.</p>
          <p>Start by optimizing your first product listing!</p>
        </div>
      ) : (
        <>
          <div className="history-list">
            {history.map((item) => (
              <div
                key={item.id}
                className={`history-item ${
                  selectedItem?.id === item.id ? "selected" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="history-item-header">
                  <span className="asin-badge">{item.asin}</span>
                  <span className="date">{formatDate(item.createdAt)}</span>
                </div>
                <div className="history-item-content">
                  <p className="title-preview">
                    {item.optimized.title.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>

          {selectedItem && (
            <div className="history-detail">
              <div className="detail-header">
                <h3>ASIN: {selectedItem.asin}</h3>
                <button
                  className="close-btn"
                  onClick={() => setSelectedItem(null)}
                >
                  ✕
                </button>
              </div>
              <p className="detail-date">
                {formatDate(selectedItem.createdAt)}
              </p>

              <div className="detail-section">
                <h4>Optimized Title</h4>
                <p>{selectedItem.optimized.title}</p>
              </div>

              <div className="detail-section">
                <h4>Optimized Bullets</h4>
                <ul>
                  {selectedItem.optimized.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h4>Optimized Description</h4>
                <p>{selectedItem.optimized.description}</p>
              </div>

              <div className="detail-section">
                <h4>Keywords</h4>
                <div className="keywords-container">
                  {selectedItem.optimized.keywords.map((keyword, idx) => (
                    <span key={idx} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HistoryView;
