const incidentStatus = require("../incidentStatus");

function isValidTransition(currentStatus, nextStatus) {
  const validTransitions = {
    [incidentStatus.OPEN]: incidentStatus.ACTIVE,
    [incidentStatus.ACTIVE]: incidentStatus.RESOLVED,
    [incidentStatus.RESOLVED]: null,
  };

  return validTransitions[currentStatus] === nextStatus;
}

module.exports = {
  isValidTransition,
};
