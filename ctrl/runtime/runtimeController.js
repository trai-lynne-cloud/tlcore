const {getRuntimeStatus, setRuntimeStatus} = require('../state/runtimeStatusController');

function startRuntime() {
    const status = getRuntimeStatus();
    if (status === 'RUNNING') {
        console.log("Runtime is already running.");
        return;
    }
    console.log("Starting runtime...");
    
    setRuntimeStatus('RUNNING');

    console.log("Runtime started.");
}  

function stopRuntime() {
    const status = getRuntimeStatus();
    if (status === 'STOPPED') {
        console.log("Runtime is already stopped.");
        return;
    }
    console.log("Stopping runtime...");
    
    setRuntimeStatus('STOPPED');
    
    console.log("Runtime stopped.");
}

module.exports = {
    startRuntime,
    stopRuntime
};