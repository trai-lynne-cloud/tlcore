const systemState = require('../../health/state/systemState');
const {
  clearDegradationStartTime,
  getDegradationStartTime,
  setDegradationStartTime,
  setActiveDegradationIncident
} = require('./degradationState');

const sustainedDegradationThreshold = 30; // Number of seconds required for sustained degradation

function evaluateSustainedDegradation(currentState) {
  // Handle Healthy|Unknown evaluation 
  if (currentState === systemState.HEALTHY ||
    currentState === systemState.UNKNOWN
  ) {
    clearDegradationStartTime();
    setActiveDegradationIncident(false);

    return false;
  }

  // Handle Degraded|Failing Evaluation 
  if (currentState === systemState.DEGRADED ||
    currentState === systemState.FAILING
  ) {
    let timestamp = getDegradationStartTime();

    if (!timestamp) {
      setDegradationStartTime();
    } else {
      let elapsedTime = Date.now() - new Date(timestamp).getTime();

      if (elapsedTime >= sustainedDegradationThreshold * 1000) return true;
    }
  }

  return false;
}

module.exports = evaluateSustainedDegradation;