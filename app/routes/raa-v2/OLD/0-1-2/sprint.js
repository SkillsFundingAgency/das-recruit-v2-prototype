module.exports = function (router) {
  // ADD cloned router files for each story if needed.
  // Should take the pattern require('./router/{{version}}/sprint/{{story number}}/router.js')(router);
  require('./sprint/ALL.js')(router);
  require('./sprint/provider-routes.js')(router);
  require('./sprint/new-design.js')(router);
  require('./sprint/new-design2.js')(router);
  // require('./sprint/training-newflow-route.js')(router);
  // Other designs not in the sprint
  //Dont add any more code here.only add routing
  // All code should be required only

}
