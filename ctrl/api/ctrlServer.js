const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('[TLCore] Control Server is running');
});

app.get('/control/status', (req, res) => {
    res.status(200).send('[TLCore] Control Server Status is ready.');
});

app.post('/control/start', (req, res) => {
    // Handle start logic
    res.status(200).send('[TLCore] Start command received');
});

app.post('/control/stop', (req, res) => {
    // Handle stop logic
    res.status(200).send('[TLCore] Stop command received');
});

module.exports = app;