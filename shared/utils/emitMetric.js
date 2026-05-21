const { createMetric } = require("../schemas/metric");

function emitMetric(serviceId, metricType, metricValue) {
    const metric = createMetric(serviceId, metricType, metricValue);

    console.log(metric)

    return metric;
}

module.exports = emitMetric;