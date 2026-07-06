let degradationStartTime = null;
let activeDegradationIncident = false;

function getDegradationStartTime() {
  return degradationStartTime;
}

function setDegradationStartTime() {
  degradationStartTime = new Date().toISOString();
  return degradationStartTime;
}

function clearDegradationStartTime() {
  degradationStartTime = null;
  return degradationStartTime;
}

function hasActiveDegradationIncident() {
  return activeDegradationIncident;
}

function setActiveDegradationIncident(value) {
  activeDegradationIncident = value;

  return activeDegradationIncident;
}

module.exports = {
  getDegradationStartTime,
  setDegradationStartTime,
  clearDegradationStartTime,
  hasActiveDegradationIncident,
  setActiveDegradationIncident
};