const incidentTransitionStore = [];

function storeIncidentTransition(transition) {
  incidentTransitionStore.push(transition);
}

function getIncidentTransitions() {
  return [...incidentTransitionStore];
}

function getIncidentTransitionsByIncidentId(incidentId) {
  return incidentTransitionStore.filter((t) => t.incident_id === incidentId);
}

function clearIncidentTransitionStore() {
  incidentTransitionStore.length = 0;
}

module.exports = {
  storeIncidentTransition,
  getIncidentTransitions,
  getIncidentTransitionsByIncidentId,
  clearIncidentTransitionStore,
};
