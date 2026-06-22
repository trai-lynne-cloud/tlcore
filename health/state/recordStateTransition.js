const getRecentMetrics = require("../utils/getRecentMetrics");
const {getLastKnownState, setLastKnownState} = require("./lastKnownState");
const { addStateTransition } = require("./stateTransitionStore");

function recordStateTransition(state) {
    let lastKnownState = getLastKnownState();

    if(state !== lastKnownState) {
        // Create transition object
        let metrics = getRecentMetrics(20)
        let transitionObject = {
            from: lastKnownState, 
            to: state, 
            timestamp: new Date().toISOString(), 
            metrics
        }
        
        // Record the state transition
        addStateTransition(transitionObject);
        console.log(`[StateTransition] Recording transition: ${transitionObject.from} -> ${transitionObject.to}`);

        // Update the last known state
        setLastKnownState(state);
    }
}

module.exports = recordStateTransition