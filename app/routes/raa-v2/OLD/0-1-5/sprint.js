module.exports = function (router) {
  var version = '0-1-5'
  var base_url = 'raa-v2/' + version + '/sprint';
  // ADD cloned router files for each story if needed.
  // Should take the pattern require('./router/{{version}}/sprint/{{story number}}/router.js')(router);
  require('./sprint/ALL.js')(router);
  require('./sprint/new-flow.js')(router);
  require('./sprint/ER-1001-location.js')(router);
  require('./sprint/ER-1005-anonymous.js')(router);
  require('./sprint/ER-324-trading.js')(router);
  require('./sprint/ER-1012-application-confirm.js')(router);
  require('./sprint/ER-470-report.js')(router);
  require('./sprint/ER-830-feedback.js')(router);
  // Other designs not in the sprint
  // All code should be required only
}
