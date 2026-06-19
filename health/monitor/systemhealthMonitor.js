const { getMetrics } = require("../../shared/metrics/metricStore")
const getRecentMetrics = require("../utils/getRecentMetrics")
const evaluateHealth = require("../eval/evaluateHealth")
const evaluateStableState = require("../eval/evaluateStableState")
const { addStateToHistory, getStateHistory } = require("../state/stateHistory")

const SystemHealthMonitor = {
    start() {
        setInterval(() => {
            const metrics = getMetrics();
            const recentMetrics = getRecentMetrics(metrics, 50);
            const currentState = evaluateHealth(recentMetrics);
            addStateToHistory(currentState);

            const stableState = evaluateStableState(getStateHistory());

            console.log("[SystemHealthMonitor] Health check completed");
            console.log("[SystemHealthMonitor] Current System State:", stableState);
        }, 10000)
    }
}

module.exports = SystemHealthMonitor;