const express = require('express');
const { getRuntimeStatus, startRuntime, stopRuntime } = require('../runtime/runtimeController');

const app = express();

app.use(express.json());

// Handle GET request to root endpoint
app.get('/', (req, res) => {
    
    const message = '[TLCore] Control Server is running';
    console.log(message);
    res.status(200).json({ message });
});

// Handle GET request to /control/status endpoint
app.get('/control/status', (req, res) => {
    const status = getRuntimeStatus();

    const message = `[TLCore] Control Server Status is ${status}.`;

    console.log(message);
    res.status(200).json({ runtimeStatus: status, message });
});

// Handle POST request to /control/start endpoint
app.post('/control/start', (req, res) => {
    // Handle start logic
    startRuntime();

    const message = `[TLCore] Control Server Status is ${getRuntimeStatus()}.`;
    
    console.log(message);
    res.status(200).json({ runtimeStatus: getRuntimeStatus(), message });
});

// Handle POST request to /control/stop endpoint
app.post('/control/stop', (req, res) => {
    // Handle stop logic
    stopRuntime();

    const message = `[TLCore] Control Server Status is ${getRuntimeStatus()}.`;

    console.log(message);
    res.status(200).json({ runtimeStatus: getRuntimeStatus(), message });
});

module.exports = app;