const emitMetric = require("../../shared/utils/emitMetric");

const NotifyServ = {
  serviceName: "NotificationService",
  interval: 2, // seconds

  behavior() {
    emitMetric(this.serviceName, "notification_queue_depth", Math.floor(Math.random() * 50));
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