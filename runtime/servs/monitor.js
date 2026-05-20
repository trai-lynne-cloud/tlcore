const createRandom = require("../../shared/utils/createRandom");
const emitMetric = require("../../shared/utils/emitMetric");
const failInjectionState = require("../failure/state");

const MonitorServ = {
  serviceName: "MonitoringService",
  interval: 18, // seconds

  behavior() {
    let cpuUsage =
      failInjectionState.cpuSpike ?
        createRandom(85, 100) //
        : createRandom(10, 60);

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