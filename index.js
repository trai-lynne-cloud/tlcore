const Runtime = require("./runtime");
const ctrlPort = 3000;
const systemHealthMonitor = require("./health/monitor/systemHealthMonitor");
const ctrlApp = require("./ctrl/ctrlServer");

// Start Control Server
console.log("[TLCore] Starting Control Server...");

ctrlApp.listen(ctrlPort, () => {
  console.log(`[TLCore] Server Listening on Port ${ctrlPort}`);
});

// Start Runtime
console.log("[TLCore] Starting Runtime...");
Runtime.start();

// Start System Health Monitor
console.log("[TLCore] Starting System Health Monitor...");
systemHealthMonitor.start();

console.log("[TLCore] System Booted");
