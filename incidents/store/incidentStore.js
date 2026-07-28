const incidentStore = [];

// Create

function storeIncident(incident) {
  incidentStore.push(incident);
}

// Read

function getIncidents() {
  return [...incidentStore];
}

function getIncidentById(incidentId) {
  const incident = incidentStore.find(
    (incident) => incident.incident_id === incidentId,
  );

  return incident ? { ...incident } : undefined;
}

// Update

function updateIncidentStatus(incidentId, nextStatus) {
  const incidentIndex = incidentStore.findIndex(
    (incident) => incident.incident_id === incidentId,
  );

  if (incidentIndex !== -1) {
    incidentStore[incidentIndex] = {
      ...incidentStore[incidentIndex],
      status: nextStatus,
    };
    return { ...incidentStore[incidentIndex] };
  }
  return null;
}

// Test Utility

function clearIncidentStore() {
  incidentStore.length = 0;
}

// Export

module.exports = {
  storeIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
  clearIncidentStore,
};
