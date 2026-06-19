const stateHistory = [];

function addStateToHistory(state) {
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