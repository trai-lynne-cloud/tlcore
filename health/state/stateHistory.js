const stateHistory = [];

function addStateToHistory(state) {
    if (stateHistory.length == 5) {
        stateHistory.shift();
    }
    stateHistory.push(state);
}

function getStateHistory() {
    return stateHistory;
}

module.exports = {
    stateHistory,
    addStateToHistory,
    getStateHistory
};