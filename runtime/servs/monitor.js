const createRandom = require("../../shared/utils/createRandom");
const emitMetric = require("../../telemetry/metrics/emitMetric");
const failInjectionState = require("../failure/state");

const MonitorServ = {
  serviceName: "MonitoringService",
  interval: 18, // seconds

  behavior() {
    if (failInjectionState.failSpike && Math.random() > 0.98) {
      throw new Error("MonitoringService simulated crash");
    }

    let cpuUsage = failInjectionState.cpuSpike
      ? createRandom(85, 100) //
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
  },
};

module.exports = MonitorServ;
