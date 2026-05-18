const AuthServ = require('./servs/auth')
const BillServ = require('./servs/bill')
const MonitorServ = require('./servs/monitor')
const NotifyServ = require('./servs/notify')


console.log("[RunTime] Started")

AuthServ.start()
BillServ.start()
MonitorServ.start()
NotifyServ.start()