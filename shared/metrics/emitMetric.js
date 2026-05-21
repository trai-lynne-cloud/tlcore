const { createMetric } = require("../schemas/metric");
const { storeMetric } = require("./metricStore");
const validateMetric = require("./validateMetric");

function emitMetric(serviceId, metricType, metricValue) {
    // Validate Metric 
    validateMetric(serviceId, metricType, metricValue);

    // Create Metric Object
    const metric = createMetric(serviceId, metricType, metricValue);

    // Store metric 
    storeMetric(metric);

    // Log metric
    console.log(metric)

    // Return metric 
    return metric;
}

module.exports = emitMetric;