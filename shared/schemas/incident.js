function createIncident(serviceId, severity) {
  return {
    service_id: serviceId,
    severity,
    start_time: new Date().toISOString()
  };
}

module.exports = {
  createIncident
}