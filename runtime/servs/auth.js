const emitMetric = require("../../shared/utils/emitMetric");
const failInjectionState = require("../failure/state");

const AuthServ = {
  serviceName: "AuthService",
  interval: 9, // seconds

  behavior() {
    let latency = failInjectionState.latencySpike ?
      Math.floor(Math.random() * (800 - 200 + 1)) + 200
      : Math.floor(Math.random() * (60 - 10 + 1)) + 10
    emitMetric(this.serviceName, "auth_latency", latency);
  },

  start() {
    this.timer = setInterval(() => {
      this.behavior();
    }, this.interval * 1000);
  },

  stop() {
    clearInterval(this.timer);
  }
};

module.exports = AuthServ;