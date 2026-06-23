const {getRuntimeStatus, setRuntimeStatus} = require('../state/runtimeStatusController');
const runtimeStatus = require('../state/runtimeStatus');

function startRuntime() {
    const status = getRuntimeStatus();
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