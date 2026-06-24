const express = require('express');
const { getRuntimeStatus, startRuntime, stopRuntime } = require('../runtime/runtimeController');
const router = express.Router();

// Handle GET request to /control/status endpoint
router.get('/control/status', (req, res) => {
    const status = getRuntimeStatus();

    const message = `[TLCore] Control Server Status is ${status}.`;

    console.log(message);
    res.status(200).json({ runtimeStatus: status, message });
});

// Handle POST request to /control/start endpoint
router.post('/control/start', (req, res) => {
    // Handle start logic
    startRuntime();

    const message = `[TLCore] Control Server Status is ${getRuntimeStatus()}.`;
    
    console.log(message);
    res.status(200).json({ runtimeStatus: getRuntimeStatus(), message });
});

// Handle POST request to /control/stop endpoint
router.post('/control/stop', (req, res) => {
    // Handle stop logic
    stopRuntime();

    const message = `[TLCore] Control Server Status is ${getRuntimeStatus()}.`;

    console.log(message);
    res.status(200).json({ runtimeStatus: getRuntimeStatus(), message });
});

module.exports = router;