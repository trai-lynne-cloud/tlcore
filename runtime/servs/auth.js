const createRandom = require("../../shared/utils/createRandom");
const emitMetric = require("../../shared/metrics/emitMetric");
const failInjectionState = require("../failure/state");

const AuthServ = {
  serviceName: "AuthService",
  interval: 9, // seconds

  behavior() {
    let latency = failInjectionState.latencySpike ?
      createRandom(200, 800)
      : createRandom(10, 60);

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