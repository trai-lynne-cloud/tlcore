const systemState = require("../state/systemState");
const getRecentMetricsByType = require("../utils/getLatestMetricsByType");

function evaluateHealth(metrics) {
    if (
        metrics === undefined ||
        metrics === null ||
        metrics.length === 0
    ) {
        return systemState.UNKNOWN;
    }

    const authLatency = getRecentMetricsByType(metrics, "auth_latency", 10);
    const cpuUtilization = getRecentMetricsByType(metrics, "cpu_utilization", 10);
    const notificationFailRate = getRecentMetricsByType(metrics, "notification_fail_rate", 10);

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
        authLatency >= 30 ||
        cpuUtilization > 60 ||
        notificationFailRate > 10
    ) {
        return systemState.DEGRADED;
    }

    // HEALTHY
    return systemState.HEALTHY;
}

module.exports = evaluateHealth;