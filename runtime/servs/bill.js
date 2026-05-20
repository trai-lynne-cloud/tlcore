const createRandom = require("../../shared/utils/createRandom");
const emitMetric = require("../../shared/utils/emitMetric");
const failInjectionState = require("../failure/state");

const BillServ = {
  serviceName: "BillingService",
  interval: 10, // seconds

  behavior() {
    let queue_depth = failInjectionState.queueBacklogSpike ?
      createRandom(500, 5000) //
      : createRandom(0, 150);

    emitMetric(this.serviceName, "billing_queue_depth", queue_depth);
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