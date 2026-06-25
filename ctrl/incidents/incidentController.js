const emitIncident = require("../../incidents/emitIncident");

function triggerIncident(incidentData) {
  console.log("[TLCore][Incident] Triggered:", incidentData);

  const {
    service_id,
    severity
  } = incidentData;

  const newIncident = emitIncident(service_id, severity);

  return newIncident;
}

module.exports = {
  triggerIncident
}