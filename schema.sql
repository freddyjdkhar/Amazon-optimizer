-- Create Database
CREATE DATABASE IF NOT EXISTS amazon_optimizer;
USE amazon_optimizer;

-- Create Optimizations Table
CREATE TABLE IF NOT EXISTS optimizations (
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes for better query performance
  INDEX idx_asin (asin),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Create a view for easier querying
CREATE OR REPLACE VIEW optimization_summary AS
SELECT 
  id,
  asin,
  LEFT(optimized_title, 50) AS title_preview,
  JSON_LENGTH(keywords) AS keyword_count,
  created_at
FROM optimizations
ORDER BY created_at DESC;