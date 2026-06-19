function getRecentMetrics(metrics, count = 100) {
    return metrics.slice(-count);
}

module.exports = getRecentMetrics;
