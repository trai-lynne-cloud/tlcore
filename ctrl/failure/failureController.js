const failInjectionState = require("../../runtime/failure/state");

// Read current failure state 
function getFailState(){
    return failInjectionState;
};

// Update failure state 
function enableFailure(failFlag){
    let currentFailState = getFailState();

    if(!validateFailFlag(failFlag)) {throw new Error(`Invalid fail flag: ${failFlag}`)}

    if(currentFailState[failFlag]) {throw new Error(`${failFlag} already enabled`)}
        
    console.log(`[TLCore] Triggering Failure: ${failFlag}`)

    failInjectionState[failFlag] = true;

    return getFailState();
}

// validate allowed flags 
function validateFailFlag(flag){
    return flag in failInjectionState;
}

module.exports = {
    getFailState,
    enableFailure
}