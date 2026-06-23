
const runtimeState = require('./runtimeState');
const runtimeStatus = require('./runtimeStatus');

// Read runtime status from the runtimeState module and return the corresponding status string.
function getRuntimeStatus() {
    return runtimeState.isRunning ? runtimeStatus.RUNNING : runtimeStatus.STOPPED;
}

// Set the runtime status in the runtimeState module based on the provided status string.
function setRuntimeStatus(status) {
    if (status === runtimeStatus.RUNNING) {
        console.log("[TLCore] Setting runtime status to RUNNING");
        runtimeState.isRunning = true;
    } else if (status === runtimeStatus.STOPPED) {
        console.log("[TLCore] Setting runtime status to STOPPED");
        runtimeState.isRunning = false;
    } else {
        console.error("[TLCore] Invalid status provided to setRuntimeStatus:", status);
        throw new Error("Invalid status. Use 'RUNNING' or 'STOPPED'.");
    }
}

module.exports = {getRuntimeStatus, setRuntimeStatus};