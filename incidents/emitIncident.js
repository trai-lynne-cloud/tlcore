const {
  createIncident
} = require("../shared/schemas/incident");
const {
  storeIncident
} = require("./incidentStore");
const validateIncident = require("./validateIncident");

function emitIncident(serviceId, severity) {
  validateIncident(serviceId, severity)

  const newIncident = createIncident(serviceId, severity);

  storeIncident(newIncident)

  console.log(`[TLCore][Incident] Created`, newIncident);

  return newIncident;
}

module.exports = emitIncident