const express = require("express");
const {
  getRuntimeStatus,
  startRuntime,
  stopRuntime,
  restartRuntime,
} = require("../../runtime/controller");
const router = express.Router();

// Handle GET request to /control/status endpoint
router.get("/ctrl/runtime/status", (req, res) => {
  res.status(200).json({
    message: "[TLCore] Runtime status retrieved successfully",
    runtimeStatus: getRuntimeStatus(),
  });
});

// Handle POST request to /control/start endpoint
router.post("/ctrl/runtime/start", (req, res) => {
  // Handle start logic
  startRuntime();

  res.status(200).json({
    message: "[TLCore] Runtime started successfully",
    runtimeStatus: getRuntimeStatus(),
  });
});

// Handle POST request to /control/stop endpoint
router.post("/ctrl/runtime/stop", (req, res) => {
  // Handle stop logic
  stopRuntime();

  res.status(200).json({
    message: "[TLCore] Runtime stopped successfully",
    runtimeStatus: getRuntimeStatus(),
  });
});

router.post("/ctrl/runtime/restart", (req, res) => {
  try {
    restartRuntime();

    res.status(200).json({
      message: "[TLCore] Runtime restarted successfully",
      runtimeStatus: getRuntimeStatus(),
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
