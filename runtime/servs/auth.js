const emitMetric = require("../../shared/utils/emitMetric");

const AuthServ = {
  serviceName: "AuthService",
  interval: 9, // seconds

  behavior() {
    emitMetric(this.serviceName, "auth_latency", Math.floor(Math.random() * 100));
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