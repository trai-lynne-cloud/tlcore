const AuthServ = {
  serviceName: "AuthService",
  interval: 9, // seconds

  behavior() {
    console.log(`[${this.serviceName}] Login attempt`);
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

module.exports = AuthServ;