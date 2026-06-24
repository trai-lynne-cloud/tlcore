const failInjectionState = require("../../runtime/failure/state");

// Read current failure state 
function getFailState(){
    return failInjectionState;
};

// Update failure state 
function enableFailure(failFlag){

    if(!validateFailFlag(failFlag)) {throw new Error(`Invalid fail flag: ${failFlag}`)}

    if(failInjectionState[failFlag]) {throw new Error(`${failFlag} already enabled`)}
        
    console.log(`[TLCore] Enabling Failure: ${failFlag}`)

    failInjectionState[failFlag] = true;

    return getFailState();
}

function disableFailure(failFlag){

    if(!validateFailFlag(failFlag)) {throw new Error(`Invalid fail flag: ${failFlag}`)}

    if(!failInjectionState[failFlag]) {throw new Error(`${failFlag} already disabled`)}

    console.log(`[TLCore] Disabling Failure: ${failFlag}`)

    failInjectionState[failFlag] = false;

    return getFailState();
}

// validate allowed flags 
function validateFailFlag(flag){
    return flag in failInjectionState;
}

module.exports = {
    getFailState,
    enableFailure,
    disableFailure
}