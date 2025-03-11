const express = require("express");
const router = express.Router();

const dashboardRoutes = require("./dashboard");
const fundRoutes      = require("./funds");
const marketRoutes    = require("./market");
const portfolioRoutes = require("./portfolio");
const userRoutes      = require("./user");
const watchlistRoutes = require("./watchlist");

// Mount all category routes
router.use("/dashboard", dashboardRoutes);
router.use("/funds", fundRoutes);
router.use("/market", marketRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/user", userRoutes);
router.use("/watchlist", watchlistRoutes);

module.exports = router;
