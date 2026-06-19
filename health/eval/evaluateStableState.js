const systemState = require('../state/systemState');

function evaluateStableState(stateHistory) {
    if (!stateHistory || stateHistory.length === 0) {
        return systemState.UNKNOWN;
    }

    const stateHistoryKey = {};

    stateHistory.forEach(state => {
        stateHistoryKey[state] = (stateHistoryKey[state] || 0) + 1;
    });

    if (stateHistoryKey.FAILING >= 2) {
        return systemState.FAILING;
    }

    if (stateHistoryKey.DEGRADED >= 3) {
        return systemState.DEGRADED;
    }

    return systemState.HEALTHY;

}

module.exports = evaluateStableState;