let degradationStartTime = null;

function getDegradationStartTime() {
  return degradationStartTime;
}

function setDegradationStartTime() {
  degradationStartTime = new Date().toISOString();
}

function clearDegradationStartTime() {
  degradationStartTime = null;
}

module.exports = {
  getDegradationStartTime,
  setDegradationStartTime,
  clearDegradationStartTime
};