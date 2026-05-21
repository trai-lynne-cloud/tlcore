function createMetric(serviceId, metricType, metricValue) {
    return {
        service_id: serviceId,
        metric_type: metricType,
        metric_value: metricValue,
        timestamp: Date.now()
    };
}

module.exports = { createMetric };