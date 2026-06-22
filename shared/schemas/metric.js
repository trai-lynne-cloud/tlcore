function createMetric(serviceId, metricType, metricValue) {
    return {
        service_id: serviceId,
        metric_type: metricType,
        metric_value: metricValue,
        timestamp: new Date().toISOString()
    };
}

module.exports = { createMetric };