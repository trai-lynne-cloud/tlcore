const express = require("express");
const {
  getFailState,
  enableFailure,
  disableFailure,
} = require("../../runtime/failure/controller/failureController");
const router = express.Router();

// Handle GET request to /control/fail-state endpoint
router.get("/ctrl/fail-state", (req, res) => {
  const failState = getFailState();

  res.status(200).json(failState);
});

// Handle POST request to /control/trigger/:flag
router.post("/ctrl/fail/trigger/:flag", (req, res) => {
  const flag = req.params.flag;

  if (!flag || flag.length < 1) {
    return res.status(400).json({
      message: "Missing or invalid failure flag",
    });
  }

  try {
    let updatedFailState = enableFailure(flag);

    res.status(200).json({
      message: `[TLCore] ${flag} enabled`,
      currentFailState: updatedFailState,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// Handle POST request to /control/disable/:flag
router.post("/ctrl/fail/recover/:flag", (req, res) => {
  const flag = req.params.flag;

  if (!flag || flag.length < 1) {
    return res.status(400).json({
      message: "Missing or invalid failure flag",
    });
  }

  try {
    let updatedFailState = disableFailure(flag);

    res.status(200).json({
      message: `[TLCore] ${flag} recovered`,
      currentFailState: updatedFailState,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
