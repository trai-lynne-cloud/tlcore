const express = require("express");
const emitMetric = require("../../telemetry/metrics/emitMetric");
const { getMetrics } = require("../../telemetry/metrics/metricStore");

const app = express();

app.use(express.json());

// Ingestion Endpoint

app.post("/metrics", (req, res) => {
  const { service_id, metric_type, metric_value } = req.body;

  if (
    service_id === undefined ||
    metric_type === undefined ||
    metric_value === undefined
  ) {
    return res
      .status(400)
      .send("Missing required fields: service_id, metric_type, metric_value");
  }

  console.log(req.body);

  emitMetric(service_id, metric_type, metric_value);

  res.send("Metrics received!");
});

app.get("/debug", (req, res) => {
  const metrics = getMetrics();
  res.json(metrics);
});

module.exports = app;
