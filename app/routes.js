const express = require('express')
const router = express.Router()
var latest_version = '0-2-1'



router.get('/raa-v2/latest-version/*', function (req, res, next) {
  // Get current URL
  var location=req.url.toString();
  var directory =  location.replace("latest-version", latest_version)
  // Redirect based to new prototype usin g the directory requested
  return res.redirect(301, directory);

});
// var defualts= require('./data/session-data-defaults.js')
// Add your routes here - above the module.exports line
require('./routes/raa-v2/0-1-0/routes.js')(router);
require('./routes/raa-v2/0-1-0/sprint.js')(router);
require('./routes/raa-v2/0-1-1/routes.js')(router);
require('./routes/raa-v2/0-1-2/routes.js')(router);
require('./routes/raa-v2/0-1-3/routes.js')(router);
require('./routes/raa-v2/0-1-4/routes.js')(router);
require('./routes/raa-v2/0-1-5/routes.js')(router);
require('./routes/raa-v2/0-1-6/routes.js')(router);
require('./routes/raa-v2/0-1-7/routes.js')(router);
require('./routes/raa-v2/0-1-8/routes.js')(router);
require('./routes/raa-v2/0-1-9/routes.js')(router);
require('./routes/raa-v2/0-1-10/routes.js')(router);
require('./routes/raa-v2/0-1-11/routes.js')(router);
require('./routes/raa-v2/0-1-12/routes.js')(router);
require('./routes/raa-v2/0-1-13/routes.js')(router);
// New version increment
require('./routes/raa-v2/0-2-1/routes.js')(router);
module.exports = router
