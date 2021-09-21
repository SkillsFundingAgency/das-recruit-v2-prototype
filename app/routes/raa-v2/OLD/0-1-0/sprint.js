module.exports = function (router) {
  // ADD cloned router files for each story if needed.
  // Should take the pattern require('./router/{{version}}/sprint/{{story number}}/router.js')(router);
  require('./sprint/ALL.js')(router);
  require('./sprint/ER-788-router.js')(router);
  require('./sprint/ER-780-router.js')(router);
  require('./sprint/ER-319-router.js')(router);
  require('./sprint/ER-487-router.js')(router);
  require('./sprint/ER-787-router.js')(router);
  require('./sprint/ER-781-router.js')(router);
  require('./sprint/ER-471-router.js')(router);
  require('./sprint/ER-442-router.js')(router);
  // Other designs not in the sprint
  require('./sprint/training.js')(router);
  require('./sprint/disability-router.js')(router);
  //Dont add any more code here.only add routing
  // All code should be required only

}
