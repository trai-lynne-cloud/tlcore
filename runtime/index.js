const AuthServ = require('./servs/auth')
const BillServ = require('./servs/bill')


console.log("[RunTime] Runtime Here")
// require('./servs/auth')
require('./servs/bill')
require('./servs/monitor')
require('./servs/notfication')

AuthServ.start()
BillServ.start()