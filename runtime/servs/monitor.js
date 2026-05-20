const emitMetric = require("../../shared/utils/emitMetric");
const failInjectionState = require("../failure/state");

const MonitorServ = {
  serviceName: "MonitoringService",
  interval: 18, // seconds

  behavior() {
    let cpuUsage =
      failInjectionState.cpuSpike ?
        Math.floor(Math.random() * 100 - 85 + 1) + 85
        : Math.floor(Math.random() * 60 - 10 + 1) + 10
    emitMetric(this.serviceName, "cpu_utilization", cpuUsage);
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

module.exports = MonitorServ;