const {
  createIncident
} = require("../shared/schemas/incident");
const validateIncident = require("./validateIncident");

function emitIncident(serviceId, severity) {
  validateIncident(serviceId, severity)

  const newIncident = createIncident(serviceId, severity);

  console.log(`[TLCore][Incident] Created`, newIncident);

  return newIncident;
}

module.exports = emitIncident