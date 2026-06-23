
const runtimeState = require('./runtimeState');

const runtimeStatus = {
    RUNNING: 'RUNNING',
    STOPPED: 'STOPPED'
}

function getRuntimeStatus() {
    return runtimeState.isRunning ? runtimeStatus.RUNNING : runtimeStatus.STOPPED;
}

function setRuntimeStatus(status) {
    if (status === runtimeStatus.RUNNING) {
        console.log("Setting runtime status to RUNNING");
        runtimeState.isRunning = true;
    } else if (status === runtimeStatus.STOPPED) {
        console.log("Setting runtime status to STOPPED");
        runtimeState.isRunning = false;
    } else {
        throw new Error("Invalid status. Use 'RUNNING' or 'STOPPED'.");
    }
}

module.exports = {
    getRuntimeStatus,
    setRuntimeStatus
};