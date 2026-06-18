const systemState = require("../state/systemState");

function getLastMetric(metrics, metricType) {
    for (let i = metrics.length - 1; i >= 0; i--) {
        if (metrics[i].metric_type === metricType) {
            return metrics[i].metric_value;
        }
    }
    return 0;
}

function evaluateHealth(metrics) {
    if (
        metrics === undefined ||
        metrics === null ||
        metrics.length === 0
    ) {
        return systemState.UNKNOWN;
    }

    const authLatency = getLastMetric(metrics, "auth_latency");
    const cpuUtilization = getLastMetric(metrics, "cpu_utilization");
    const notificationFailRate = getLastMetric(metrics, "notification_fail_rate");

    // FAILING
    if (
        authLatency >= 200 ||
        cpuUtilization > 85 ||
        notificationFailRate > 20
    ) {
        return systemState.FAILING;
    }

    // DEGRADED 
    if (
        authLatency >= 10 ||
        cpuUtilization > 60 ||
        notificationFailRate > 10
    ) {
        return systemState.DEGRADED;
    }

    // HEALTHY
    return systemState.HEALTHY;
}

module.exports = evaluateHealth;