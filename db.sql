CREATE DATABASE amazon_optimizer;
USE amazon_optimizer;

CREATE TABLE optimizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asin VARCHAR(20) NOT NULL,
  original_title TEXT,
  optimized_title TEXT,
  original_bullets TEXT,
  optimized_bullets TEXT,
  original_description TEXT,
  optimized_description TEXT,
  keywords TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_asin (asin),
  INDEX idx_created_at (created_at)
);
