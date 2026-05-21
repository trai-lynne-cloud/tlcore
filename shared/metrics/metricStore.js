const metricStore = [];

function storeMetric(metric) {
    metricStore.push(metric);
}

function getMetrics() {
    return [...metricStore];
}

function clearMetrics() {
    metricStore.length = 0;
}

module.exports = {
    storeMetric,
    getMetrics,
    clearMetrics
};