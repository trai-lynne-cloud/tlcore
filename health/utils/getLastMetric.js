function getLastMetric(metrics, metricType) {
    for (let i = metrics.length - 1; i >= 0; i--) {
        if (metrics[i].metric_type === metricType) {
            return metrics[i].metric_value;
        }
    }
    return 0;
}

module.exports = getLastMetric;