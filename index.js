const Runtime = require("./runtime");
const ingestionApp = require("./runtime/api/ingestionServer");
const ctrlPort = 3000;
const ingestionPort = 3001;
const systemHealthMonitor = require("./health/monitor/systemhealthMonitor");
const ctrlApp = require("./ctrl/ctrlServer");

// Start Control Server
console.log("[TLCore] Starting Control Server...");

ctrlApp.listen(ctrlPort, () => {
  console.log(`[TLCore] Control Server Listening on Port ${ctrlPort}`);
});

// Start Runtime
console.log("[TLCore] Starting Runtime...");
Runtime.start();

// Start Ingestion Server
console.log("[TLCore] Starting Ingestion Server...");

ingestionApp.listen(ingestionPort, () => {
  console.log(`[TLCore] Ingestion Server Listening on Port ${ingestionPort}`);
});

// Start System Health Monitor
console.log("[TLCore] Starting System Health Monitor...");
systemHealthMonitor.start();

console.log("[TLCore] System Booted");
