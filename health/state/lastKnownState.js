const systemState = require("./systemState");

let lastKnownState = systemState.UNKNOWN;

function getLastKnownState(){
    return lastKnownState;
};

function setLastKnownState(state){
    lastKnownState = state;
}

module.exports = {
    getLastKnownState,
    setLastKnownState
};