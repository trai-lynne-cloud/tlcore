const systemState = require('../state/systemState');

function evaluateStableState(stateHistory) {
    // UNKNOWN
    if (!stateHistory || stateHistory.length === 0) {
        return systemState.UNKNOWN;
    }

    
    const stateHistoryKey = {};

    stateHistory.forEach(state => {
        stateHistoryKey[state] = (stateHistoryKey[state] || 0) + 1;
    });

    // FAILING
    if (stateHistoryKey.FAILING >= 2) {
        return systemState.FAILING;
    }
    // DEGRADED
    if (stateHistoryKey.DEGRADED >= 3) {
        return systemState.DEGRADED;
    }
    // HEALTHY
    return systemState.HEALTHY;

}

module.exports = evaluateStableState;