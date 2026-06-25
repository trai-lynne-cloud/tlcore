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
    
    return getRuntimeStatus()
}  

function stopRuntime() {
    const status = getRuntimeStatus();

    // if service is already stopped, log a message and return
    if (status === runtimeStatus.STOPPED) {
        console.log("[TLCore] Runtime is already stopped.");
        return;
    }
    
    console.log("[TLCore] Stopping runtime...");
    
    setRuntimeStatus(runtimeStatus.STOPPED);
    
    console.log("[TLCore] Runtime stopped.");

    return getRuntimeStatus()
}

function restartRuntime() {
    console.log("[TLCore] Restarting Runtime...");

    stopRuntime();

    if(getRuntimeStatus() !== runtimeStatus.STOPPED) throw new Error("[TLCore] Problem Stopping runtime")

    startRuntime();

    if (getRuntimeStatus() !== runtimeStatus.RUNNING) throw new Error("[TLCore] Problem Starting runtime")
    
    console.log("[TLCore] Runtime restarted successfully");
    
    return getRuntimeStatus();
}

module.exports = {
    getRuntimeStatus,
    startRuntime,
    stopRuntime,
    restartRuntime
};