const {getLastKnownState, setLastKnownState} = require("./lastKnownState");
const { addStateTransition } = require("./stateTransitionStore");

function recordStateTransition(state) {
    let lastKnownState = getLastKnownState();
    if(state !== lastKnownState) {
        // Record the state transition
        addStateTransition({from: lastKnownState, to: state});
        // Update the last known state
        setLastKnownState(state);
    }
}

module.exports = recordStateTransition