const {getRuntimeStatus, setRuntimeStatus} = require('../state/runtimeStatusController');
const runtimeStatus = require('../state/runtimeStatus');

// Handle startRuntime function
function startRuntime() {
    const status = getRuntimeStatus();

    // If service is already running, log a message and return
    if (status === runtimeStatus.RUNNING) {
        console.log("[TLCore] Runtime is already running.");
        return;
    }

    console.log("[TLCore] Starting runtime...");
    
    setRuntimeStatus(runtimeStatus.RUNNING);

    console.log("[TLCore] Runtime started.");
}  

function stopRuntime() {
    const status = getRuntimeStatus();

    // if servise is already stopped, log a message and return
    if (status === runtimeStatus.STOPPED) {
        console.log("[TLCore] Runtime is already stopped.");
        return;
    }
    
    console.log("[TLCore] Stopping runtime...");
    
    setRuntimeStatus(runtimeStatus.STOPPED);
    
    console.log("[TLCore] Runtime stopped.");
}

module.exports = {
    getRuntimeStatus,
    startRuntime,
    stopRuntime
};