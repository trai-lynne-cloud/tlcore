const BillServ = {
  serviceName: "BillingService",
  interval: 1, // seconds

  behavior() {
    console.log(`[${this.serviceName}] Transaction attempt`);
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