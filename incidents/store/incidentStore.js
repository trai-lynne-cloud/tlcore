const incidentStore = [];

function storeIncident(incident) {
  incidentStore.push(incident)
};

function getIncidents() {
  return [...incidentStore];
}

module.exports = {
  storeIncident,
  getIncidents
}