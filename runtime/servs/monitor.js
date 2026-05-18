const MonitorServ = {
  serviceName: "MonitoringService",
  interval: 18, // seconds

  behavior() {
    console.log(`[${this.serviceName}] CPU Spike`);
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