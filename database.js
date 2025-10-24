const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

// Save optimization to database
async function saveOptimization(data) {
  const query = `
    INSERT INTO optimizations 
    (asin, original_title, optimized_title, original_bullets, optimized_bullets, 
     original_description, optimized_description, keywords)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.asin,
    data.original.title,
    data.optimized.title,
    JSON.stringify(data.original.bullets),
    JSON.stringify(data.optimized.bullets),
    data.original.description,
    data.optimized.description,
    JSON.stringify(data.optimized.keywords),
  ];

  const [result] = await pool.execute(query, values);
  return result.insertId;
}

// Get optimization history for a specific ASIN
async function getHistoryByAsin(asin) {
  const query = `
    SELECT * FROM optimizations 
    WHERE asin = ? 
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.execute(query, [asin]);

  return rows.map((row) => ({
    id: row.id,
    asin: row.asin,
    original: {
      title: row.original_title,
      bullets: JSON.parse(row.original_bullets),
      description: row.original_description,
    },
    optimized: {
      title: row.optimized_title,
      bullets: JSON.parse(row.optimized_bullets),
      description: row.optimized_description,
      keywords: JSON.parse(row.keywords),
    },
    createdAt: row.created_at,
  }));
}

// Get all optimization history
async function getAllHistory() {
  const query = `
    SELECT * FROM optimizations 
    ORDER BY created_at DESC 
    LIMIT 100
  `;

  const [rows] = await pool.execute(query);

  return rows.map((row) => ({
    id: row.id,
    asin: row.asin,
    original: {
      title: row.original_title,
      bullets: JSON.parse(row.original_bullets),
      description: row.original_description,
    },
    optimized: {
      title: row.optimized_title,
      bullets: JSON.parse(row.optimized_bullets),
      description: row.optimized_description,
      keywords: JSON.parse(row.keywords),
    },
    createdAt: row.created_at,
  }));
}

module.exports = {
  pool,
  saveOptimization,
  getHistoryByAsin,
  getAllHistory,
};
