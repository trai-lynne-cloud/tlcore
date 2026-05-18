const AuthServ = require('./servs/auth')


console.log("[RunTime] Runtime Here")
// require('./servs/auth')
require('./servs/billing')
require('./servs/monitor')
require('./servs/notfication')

AuthServ.start()