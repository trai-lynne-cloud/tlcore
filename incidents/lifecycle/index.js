const {
  getIncidentById,
  updateIncidentStatus,
} = require("../store/incidentStore");
const { isValidTransition } = require("./incidentTransitionRule");
const { createIncidentTransition } = require("../schema/incidentTransition");
const { storeIncidentTransition } = require("../store/incidentTransitionStore");
const incidentStatus = require("../schema/incidentStatus");

function transitionIncident(incidentId, nextStatus) {
  const incident = getIncidentById(incidentId);

  if (!incident) {
    throw new Error(`Invalid incident id: ${incidentId}`);
  }

  const previousStatus = incident.status;

  if (!Object.values(incidentStatus).includes(nextStatus)) {
    throw new Error(`Invalid status: ${nextStatus}`);
  }

  if (!isValidTransition(previousStatus, nextStatus)) {
    throw new Error(
      `Invalid incident transition: ${previousStatus} to ${nextStatus}`,
    );
  }

  const updatedIncident = updateIncidentStatus(incidentId, nextStatus);

  const incidentTransition = createIncidentTransition(
    incidentId,
    previousStatus,
    nextStatus,
  );

  storeIncidentTransition(incidentTransition);

  return { incident: updatedIncident, transition: incidentTransition };
}

module.exports = transitionIncident;
