function createIncidentTransition(incidentId, previousStatus, nextStatus) {
  return {
    incident_id: incidentId,
    previous_status: previousStatus,
    next_status: nextStatus,
    transition_time: new Date().toISOString(),
  };
}

module.exports = {
  createIncidentTransition,
};
