const stateTransitionStore = [];

function addStateTransition(transition){
    stateTransitionStore.push(transition);
};

function getStateTransitions(){
    return stateTransitionStore;
};

module.exports = {
    addStateTransition,
    getStateTransitions
};