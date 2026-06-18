const systemState = require("../state/systemState");

function evaluateHealth(metrics) {
    if (metrics === undefined ||
        metrics === null ||
        metrics.length === 0
    ) { return systemState.UNKNOWN; }

    return systemState.HEALTHY;

}

module.exports = evaluateHealth;