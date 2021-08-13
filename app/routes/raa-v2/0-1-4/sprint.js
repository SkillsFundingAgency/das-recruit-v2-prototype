module.exports = function (router) {
  var version = '0-1-4'
  var base_url = 'raa-v2/' + version + '/sprint';
  // ADD cloned router files for each story if needed.
  // Should take the pattern require('./router/{{version}}/sprint/{{story number}}/router.js')(router);
  require('./sprint/ALL.js')(router);
  require('./sprint/new-flow.js')(router);
  require('./sprint/ER-894-clone.js')(router);
  require('./sprint/ER-470-report.js')(router);
  require('./sprint/ER-845-router.js')(router);
  require('./sprint/ER-1001-location.js')(router);
  require('./sprint/ER-1005-anonymous.js')(router);
  // Other designs not in the sprint
  // All code should be required only
  router.get('/' + base_url + '/overview', function (req, res) {
    if(req.query.user){
      req.session.user = req.query.user
    }
    req.session.user = req.session.user || "provider";
    res.render(base_url + '/overview', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  })
}
