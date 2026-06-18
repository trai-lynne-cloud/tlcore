const Runtime = require('./runtime')
const app = require('./runtime/api/ingestionServer')
const port = 3000;
const { getMetrics } = require("./shared/metrics/metricStore")
const evaluateHealth = require("./health/eval/evaluateHealth")

// Start Runtime 
console.log("[TLCore] Starting Runtime...")
Runtime.start()

// Start Ingestion Server 
console.log("[TLCore] Starting Ingestion Server...")

app.listen(port, () => {
    console.log(`[TLCore] Ingestion Server Listening on Port ${port}`);
});

console.log("[TLCore] System Booted")

setInterval(() => {
    const metrics = getMetrics();
    const state = evaluateHealth(metrics);

    console.log("[TLCore] Health check completed");
    console.log("[TLCore] Current System State:", state);
}, 3000)