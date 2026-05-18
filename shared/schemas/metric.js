function createMetric(serviceName, metricType, value) {
    return {
        serviceName,
        metricType,
        value,
        timestamp: Date.now()
    };
}

module.exports = {createMetric};