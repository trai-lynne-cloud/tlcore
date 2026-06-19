function getLatestMetricsByType(metrics, metricType, count = 10) {
    let filteredMetrics = metrics.filter(metric => metric.metric_type === metricType).slice(-count);

    console.log("Filtered: ", filteredMetrics);

    return filteredMetrics.map(metric => metric.metric_value);
}

module.exports = getLatestMetricsByType;