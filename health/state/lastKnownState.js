let lastKnownState = null;

function getLastKnownState(){
    return lastKnownState;
};

function setlastKnownState(state){
    lastKnownState = state;
}

module.exports = {
    getLastKnownState,
    setlastKnownState
};