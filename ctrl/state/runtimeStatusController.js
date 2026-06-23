
const runtimeState = require('./runtimeState');
const runtimeStatus = require('./runtimeStatus');

function getRuntimeStatus() {
    return runtimeState.isRunning ? runtimeStatus.RUNNING : runtimeStatus.STOPPED;
}

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