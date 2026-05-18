const emitMetric = require("../../shared/utils/emitMetric");

const BillServ = {
  serviceName: "BillingService",
  interval: 10, // seconds

  behavior() {
    emitMetric(this.serviceName, "billing_queue_depth", Math.floor(Math.random() * 1000));
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

module.exports = BillServ;