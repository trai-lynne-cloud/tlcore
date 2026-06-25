const incidentSeverity = require("./incidentSeverity");

function validateIncident(serviceId, severity) {
  if (!serviceId || !severity) {
    throw new Error("Invalid incident: Missing required fields");
  }

  if (typeof serviceId !== "string") {
    throw new Error("Invalid incident: service_id must be a string");
  }

  if (typeof severity !== "string") {
    throw new Error("Invalid incident: severity must be a string");
  }

  if (!incidentSeverity[severity]) {
    throw new Error("Invalid Incident: severity must be a valid severity level");
  }

  return true;
}

module.exports = validateIncident