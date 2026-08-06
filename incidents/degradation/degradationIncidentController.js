const { triggerIncident } = require("../controller");
const systemState = require("../../health/state/systemState");
const incidentStatus = require("../schema/incidentStatus");
const {
  hasActiveDegradationIncident,
  setActiveDegradationIncidentId,
  getActiveDegradationIncidentId,
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

function resolveDegradationIncident(incidentId) {
  const resolvedIncident = transitionIncident(
    incidentId,
    incidentStatus.RESOLVED,
  );

  if (
    !resolvedIncident ||
    resolvedIncident.incident.status !== incidentStatus.RESOLVED
  ) {
    throw new Error(`Failed to resolve incident with id: ${incidentId}`);
  }

  setActiveDegradationIncidentId(null);

  return resolvedIncident;
}

function handleDegradationIncident(currentState) {
  if (currentState === systemState.UNKNOWN) return null;

  const sustainedDegradation = evaluateSustainedDegradation(currentState);
  const activeDegradationIncident = hasActiveDegradationIncident();

  if (sustainedDegradation && !activeDegradationIncident) {
    return openDegradationIncident(currentState);
  }

  if (!sustainedDegradation && activeDegradationIncident) {
    if (currentState === systemState.HEALTHY) {
      const incidentID = getActiveDegradationIncidentId();
      return resolveDegradationIncident(incidentID);
    }
  }

  return null;
}

module.exports = handleDegradationIncident;
