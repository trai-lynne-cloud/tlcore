const { triggerIncident } = require("../controller");
const systemState = require("../../health/state/systemState");
const incidentStatus = require("../schema/incidentStatus");
const {
  hasActiveDegradationIncident,
  setActiveDegradationIncidentId,
} = require("./degradationState");
const evaluateSustainedDegradation = require("./evaluateSustainedDegradation");
const transitionIncident = require("../lifecycle");

function openDegradationIncident(currentState) {
  const createdIncident = triggerIncident({
    service_id: "SystemHealthMonitor",
    severity: currentState === systemState.FAILING ? "S0" : "S2",
  });

  const incidentId = createdIncident.incident_id;

  const activeIncident = transitionIncident(incidentId, incidentStatus.ACTIVE);
  setActiveDegradationIncidentId(incidentId);

  return activeIncident;
}

function handleDegradationIncident(currentState) {
  const sustainedDegradation = evaluateSustainedDegradation(currentState);
  const activeDegradationIncident = hasActiveDegradationIncident();

  if (sustainedDegradation && !activeDegradationIncident) {
    return openDegradationIncident(currentState);
  }

  return null;
}

module.exports = handleDegradationIncident;
