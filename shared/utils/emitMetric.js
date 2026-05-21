const { createMetric } = require("../schemas/metric");
const validateMetric = require("./validateMetric");

function emitMetric(serviceId, metricType, metricValue) {
    validateMetric(serviceId, metricType, metricValue);

    const metric = createMetric(serviceId, metricType, metricValue);

    console.log(metric)

    return metric;
}

module.exports = emitMetric;