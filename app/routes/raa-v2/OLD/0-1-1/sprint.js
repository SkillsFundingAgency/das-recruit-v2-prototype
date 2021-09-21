module.exports = function (router) {
  // ADD cloned router files for each story if needed.
  // Should take the pattern require('./router/{{version}}/sprint/{{story number}}/router.js')(router);
  require('./sprint/ALL.js')(router);
  require('./sprint/ER-442-router.js')(router); //Dashboard
  require('./sprint/ER-319-router.js')(router); //Nationwide
  require('./sprint/disability-router.js')(router);
  require('./sprint/training-router.js')(router);
  require('./sprint/ER-845-router.js')(router);
  require('./sprint/ER-487-router.js')(router); // trading name.
  require('./sprint/ER-324-router.js')(router); // Anonymous
  require('./sprint/ER-471-router.js')(router); // Notifcations
  require('./sprint/webchat.js')(router);
  require('./sprint/webchat.js')(router);

  // Other designs not in the sprint

}
