const getRecentMetrics = require("../utils/getRecentMetrics");
const {getLastKnownState, setLastKnownState} = require("./lastKnownState");
const { addStateTransition } = require("./stateTransitionStore");

function recordStateTransition(state) {
    let lastKnownState = getLastKnownState();
    if(state !== lastKnownState) {
        let metrics = getRecentMetrics(20)
        // Record the state transition
        addStateTransition({
            from: lastKnownState, 
            to: state, 
            timestamp: new Date().toISOString(), 
            metrics
        });
        // Update the last known state
        setLastKnownState(state);
    }
}

module.exports = recordStateTransition