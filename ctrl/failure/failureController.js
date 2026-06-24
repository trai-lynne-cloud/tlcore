const failInjectionState = require("../../runtime/failure/state");

// Read current failure state 
function getFailState(){
    return failInjectionState;
};

// Update failure state 
function enableFailure(failFlag){
    if(!validateFailFlag(failFlag)) {throw new Error(`Invalid fail flag: ${failFlag}`)}

    if(failInjectionState[failFlag]) {
        console.log("[TLCore] Failure Mode already triggered")
        return getFailState()
    }
        
    console.log(`[TLCore] Triggering Failure: ${failFlag}`)

    failInjectionState[failFlag] = true;

    return getFailState();
}

// validate allowed flags 
function validateFailFlag(flag){
    return Object.keys(getFailState()).includes(flag)
}

module.exports = {
    getFailState,
    enableFailure
}