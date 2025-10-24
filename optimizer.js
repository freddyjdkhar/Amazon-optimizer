const express = require("express");
const router = express.Router();
const { scrapeAmazonProduct } = require("../services/scraper");
const { optimizeProductListing } = require("../services/aiOptimizer");
const {
  saveOptimization,
  getHistoryByAsin,
  getAllHistory,
} = require("../db/database");

// Optimize product listing
router.post("/optimize", async (req, res) => {
  try {
    const { asin } = req.body;

    if (!asin) {
      return res.status(400).json({ error: "ASIN is required" });
    }

    // Validate ASIN format (basic validation)
    if (!/^[A-Z0-9]{10}$/.test(asin)) {
      return res.status(400).json({ error: "Invalid ASIN format" });
    }

    console.log(`Processing ASIN: ${asin}`);

    // Step 1: Scrape product data
    const productData = await scrapeAmazonProduct(asin);
    console.log("Product data scraped successfully");

    // Step 2: Optimize with AI
    const optimizedData = await optimizeProductListing(productData);
    console.log("Product data optimized successfully");

    // Step 3: Prepare response
    const result = {
      asin,
      original: {
        title: productData.title,
        bullets: productData.bullets,
        description: productData.description,
      },
      optimized: {
        title: optimizedData.title,
        bullets: optimizedData.bullets,
        description: optimizedData.description,
        keywords: optimizedData.keywords,
      },
    };

    // Step 4: Save to database
    await saveOptimization(result);
    console.log("Optimization saved to database");

    res.json(result);
  } catch (error) {
    console.error("Optimization error:", error);
    res.status(500).json({
      error: "Failed to optimize product listing",
      message: error.message,
    });
  }
});

// Get history for specific ASIN
router.get("/history/:asin", async (req, res) => {
  try {
    const { asin } = req.params;
    const history = await getHistoryByAsin(asin);
    res.json(history);
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch history",
      message: error.message,
    });
  }
});

// Get all history
router.get("/history", async (req, res) => {
  try {
    const history = await getAllHistory();
    res.json(history);
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch history",
      message: error.message,
    });
  }
});

module.exports = router;
