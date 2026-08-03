// CREATE
let degradationStartTime = null;
let activeDegradationIncidentId = null;

// READ

function getDegradationStartTime() {
  return degradationStartTime;
}

function hasActiveDegradationIncident() {
  return activeDegradationIncidentId !== null;
}

function getActiveDegradationIncidentId() {
  return activeDegradationIncidentId;
}

// UPDATE

function setDegradationStartTime() {
  degradationStartTime = new Date().toISOString();
  return degradationStartTime;
}

function setActiveDegradationIncidentId(incidentId) {
  activeDegradationIncidentId = incidentId;

  return activeDegradationIncidentId;
}

// RESET

function clearDegradationStartTime() {
  degradationStartTime = null;
  return degradationStartTime;
}

function clearActiveDegradationIncidentId() {
  activeDegradationIncidentId = null;

  return activeDegradationIncidentId;
}

function clearDegradationState() {
  clearDegradationStartTime();
  clearActiveDegradationIncidentId();
}

module.exports = {
  getDegradationStartTime,
  setDegradationStartTime,
  clearDegradationStartTime,
  hasActiveDegradationIncident,
  getActiveDegradationIncidentId,
  setActiveDegradationIncidentId,
  clearActiveDegradationIncidentId,
  clearDegradationState,
};
