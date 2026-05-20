const emitMetric = require("../../shared/utils/emitMetric");
const failInjectionState = require("../failure/state");

const NotifyServ = {
  serviceName: "NotificationService",
  interval: 2, // seconds

  behavior() {
    let queue_depth = failInjectionState.queueBacklogSpike ?
      Math.floor(Math.random() * 5000 - 500 + 1) + 500
      : Math.floor(Math.random() * 151);
    emitMetric(this.serviceName, "notification_queue_depth", queue_depth);
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

module.exports = NotifyServ;