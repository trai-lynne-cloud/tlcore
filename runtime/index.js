const AuthServ = require('./servs/auth')
const BillServ = require('./servs/bill')
const MonitorServ = require('./servs/monitor')
const NotifyServ = require('./servs/notify')

const services = [
  AuthServ,
  BillServ,
  MonitorServ,
  NotifyServ
];

const Runtime = {
  start() {
    console.log("[Runtime] Started");

    services.forEach(service => service.start());
  }
};

module.exports = Runtime;