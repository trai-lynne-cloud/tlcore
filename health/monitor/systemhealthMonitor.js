const getRecentMetrics = require("../utils/getRecentMetrics");
const evaluateHealth = require("../eval/evaluateHealth");
const evaluateStableState = require("../eval/evaluateStableState");
const {
    addStateToHistory,
    getStateHistory
} = require("../state/stateHistory");
const recordStateTransition = require("../state/recordStateTransition");
const handleDegradationIncident = require("../../incidents/degradation/degradationIncidentController");

const SystemHealthMonitor = {
    start() {
        this.tick();

        setInterval(() => {
            this.tick();
        }, 10000);
    },

    tick() {
        const stableState = this.runEvaluation();
        console.log("[SystemHealthMonitor] Health check completed");
        console.log("[SystemHealthMonitor] Current System State:", stableState);
    },

    runEvaluation() {
        const recentMetrics = getRecentMetrics(50);

        const currentState = evaluateHealth(recentMetrics);

        addStateToHistory(currentState);

        const stableState = evaluateStableState(getStateHistory());

        recordStateTransition(stableState);

        let degradationIncident = handleDegradationIncident(stableState);

        if (degradationIncident) {
            console.log("[SystemHealthMonitor] Degradation incident created:", degradationIncident);
        }

        return stableState;
    },
};

module.exports = SystemHealthMonitor;