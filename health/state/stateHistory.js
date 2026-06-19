const stateHistory = [];

// Add a state to the history
function addStateToHistory(state) {
    if (stateHistory.length == 5) {
        stateHistory.shift();
    }
    stateHistory.push(state);
}

// Get the current state history
function getStateHistory() {
    return stateHistory;
}

module.exports = {
    stateHistory,
    addStateToHistory,
    getStateHistory
};