const incidentStatus = require("../incidentStatus");
const { randomUUID } = require("crypto");

function createIncident(serviceId, severity) {
  return {
    incident_id: randomUUID(),
    service_id: serviceId,
    severity,
    start_time: new Date().toISOString(),
    status: incidentStatus.OPEN,
  };
}

module.exports = {
  createIncident,
};
