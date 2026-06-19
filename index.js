const Runtime = require('./runtime')
const app = require('./runtime/api/ingestionServer')
const port = 3000;
const { getMetrics } = require("./shared/metrics/metricStore")
const evaluateHealth = require("./health/eval/evaluateHealth")
const getRecentMetrics = require("./health/utils/getRecentMetrics")
const { addStateToHistory, getStateHistory } = require("./health/state/stateHistory")
const evaluateStableState = require("./health/eval/evaluateStableState")

// Start Runtime 
console.log("[TLCore] Starting Runtime...")
Runtime.start()

// Start Ingestion Server 
console.log("[TLCore] Starting Ingestion Server...")

app.listen(port, () => {
    console.log(`[TLCore] Ingestion Server Listening on Port ${port}`);
});

console.log("[TLCore] System Booted")

// Start System health monitoring
setInterval(() => {
    const metrics = getMetrics();
    const recentMetrics = getRecentMetrics(metrics, 50);
    const currentState = evaluateHealth(recentMetrics);
    addStateToHistory(currentState);

    const stableState = evaluateStableState(getStateHistory());

    console.log("[TLCore] Health check completed");
    console.log("[TLCore] Current System State:", stableState);
}, 3000)