const express = require("express");
const emitMetric = require("../../telemetry/metrics/emitMetric");
const { getMetrics } = require("../../telemetry/metrics/metricStore");

const router = express.Router();

// Ingestion Endpoint

router.post("/metrics", (req, res) => {
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

router.get("/debug", (req, res) => {
  const metrics = getMetrics();
  res.json(metrics);
});

module.exports = router;
