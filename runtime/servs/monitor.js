const emitMetric = require("../../shared/utils/emitMetric");

const MonitorServ = {
  serviceName: "MonitoringService",
  interval: 18, // seconds

  behavior() {
    emitMetric(this.serviceName, "cpu_utilization", Math.floor(Math.random() * 100));
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