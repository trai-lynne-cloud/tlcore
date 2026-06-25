const emitIncident = require("../../incidents/emitIncident");
const {
  getIncidents
} = require("../../incidents/incidentStore");

function triggerIncident(incidentData) {
  console.log("[TLCore][Incident] Triggered:", incidentData);

  const {
    service_id,
    severity
  } = incidentData;

  const newIncident = emitIncident(service_id, severity);

  return newIncident;
}

function getAllIncidents() {
  return getIncidents();
}

module.exports = {
  triggerIncident,
  getAllIncidents
}