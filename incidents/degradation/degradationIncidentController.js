const {
  triggerIncident
} = require("../../ctrl/incidents/incidentController");
const systemState = require("../../health/state/systemState");
const {
  hasActiveDegradationIncident,
  setActiveDegradationIncident
} = require("./degradationState");
const evaluateSustainedDegradation = require("./evaluateSustainedDegradation");

function handleDegradationIncident(currentState) {
  const sustainedDegradation = evaluateSustainedDegradation(currentState);
  const activeDegradationIncident = hasActiveDegradationIncident();

  if (sustainedDegradation && !activeDegradationIncident) {
    setActiveDegradationIncident(true)

    return triggerIncident({
      service_id: "SystemHealthMonitor",
      severity: currentState === systemState.FAILING ? "S0" : "S2"
    });
  }

  return null;
}

module.exports = handleDegradationIncident;