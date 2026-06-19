// Get the most recent metrics from the list
function getRecentMetrics(metrics, count = 100) {
    return metrics.slice(-count);
}

module.exports = getRecentMetrics;
