const express = require('express');
const { getFailState } = require('../failure/failureController');
const router = express.Router();

// Handle GET request to /control/fail-state endpoint
router.get('/control/fail-state', (req, res) => {
    const failState = getFailState();

    res.status(200).json(failState)
})

module.exports = router;