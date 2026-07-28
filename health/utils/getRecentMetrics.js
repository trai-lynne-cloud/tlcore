const { getMetrics } = require("../../telemetry/metrics/metricStore");

// Get the most recent metrics from the list
function getRecentMetrics(count = 100) {
  const metrics = getMetrics();
  return metrics.slice(-count);
}

module.exports = getRecentMetrics;
