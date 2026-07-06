const systemState = require('../../health/state/systemState');
const {
  clearDegradationStartTime,
  getDegradationStartTime,
  setDegradationStartTime
} = require('./degradationState');

const sustainedDegradationThreshold = 30; // Number of seconds required for sustained degradation

function evaluateSustainedDegradation(currentState) {
  if (currentState === systemState.HEALTHY ||
    currentState === systemState.UNKNOWN
  ) {
    clearDegradationStartTime()
    return false
  }

  if (currentState === systemState.DEGRADED ||
    currentState === systemState.FAILING
  ) {
    let timestamp = getDegradationStartTime();

    if (!timestamp) {
      setDegradationStartTime();
    } else {
      let elapsedTime = Date.now() - new Date(getDegradationStartTime()).getTime();

      if (elapsedTime >= sustainedDegradationThreshold * 1000) return true;
    }
  }

  return false;
}

module.exports = evaluateSustainedDegradation;