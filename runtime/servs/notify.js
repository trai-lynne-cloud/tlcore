const NotifyServ = {
  serviceName: "NotificationService",
  interval: 2, // seconds

  behavior() {
    console.log(`[${this.serviceName}] idle check`);
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