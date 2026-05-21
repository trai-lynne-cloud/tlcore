const metricStore = [];

function storeMetric(metric) {
    metricStore.push(metric);
}

function getMetrics() {
    return [...metricStore];
}

module.exports = {
    storeMetric,
    getMetrics
};