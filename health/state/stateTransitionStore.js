const stateTransitionStore = [];

// Add a state transition to the store
function addStateTransition(transition){
    stateTransitionStore.push(transition);
};

// Get the state transitions from the store
function getStateTransitions(){
    return stateTransitionStore;
};

module.exports = {
    addStateTransition,
    getStateTransitions
};