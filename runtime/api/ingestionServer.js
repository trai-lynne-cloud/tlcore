const express = require('express');
const emitMetric = require('../../shared/metrics/emitMetric');

const app = express();
const port = 3000;

app.use(express.json());

// Ingestion Endpoint

app.post('/metrics', (req, res) => {
    console.log(req.body);

    emitMetric(req.body.service_id, req.body.metric_type, req.body.metric_value);

    res.send('Metrics received!');
});

// Port Listener 
app.listen(port, () => {
    console.log(`Hello World from Port ${port}`);
})