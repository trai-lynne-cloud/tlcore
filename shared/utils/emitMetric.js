const { createMetric } = require("../schemas/metric");

function emitMetric(serviceName, metricType, value) {
    const metric = createMetric(serviceName, metricType, value);

    console.log(metric)
    
    return metric;
}

module.exports = emitMetric;