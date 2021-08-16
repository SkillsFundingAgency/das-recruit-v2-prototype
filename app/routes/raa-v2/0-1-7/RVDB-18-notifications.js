module.exports = function (router) {



  // CHANGE VERSION TO THE VERSION
  var version = '0-1-7'
  var base_url = 'raa-v2/' + version + "/RVDB-38-notifications/"
  var moment = require('moment');
  var NotifyClient = require('notifications-node-client').NotifyClient
  var notifyClient = new NotifyClient('raa_prototype-56212736-a673-407e-998f-9cce2571269b-4ce3272b-629b-43aa-b6d0-f0cfc25e0882')

  function getEmployersList($employers,$amount){
    var newEmployersList = []
    var rand
    for(var i=0;i<$amount;i++){
      var rand = $employers[Math.floor(Math.random() * $employers.length)];
      newEmployersList.push(rand)
    }
    return newEmployersList
  }


  // -------------------------------
  // #config
  // -------------------------------
  router.post('/' + base_url + '*config', function (req, res) {

    req.session.data.providerName = req.session.data.orgName
    req.session.data.employers_list = getEmployersList(req.session.data.employers,req.session.data.employerAmount)
    res.redirect(301, '/' + base_url + req.params[0] + req.body.dashboard+"/dashboard")
  })
  router.get('/' + base_url + '*/dashboard*', function (req, res) {
    var query = req.query.search
    console.log("seiofjhasdjfojoisdj")
    if (query){
      if(req.query.search.indexOf('(') > -1){
        query = req.query.search.slice(0,req.query.search.indexOf('(')-1)
      }
    }
    req.session.data.user='provider'
    res.render(base_url + req.params[0]+ '/dashboard' + req.params[1], {
      "search" : query,
      }
    )
  })
  router.get('/' + base_url + 'vacancies', function (req, res) {
    var query = req.query.search
    req.session.data.user="provider"
    if (query){
      if(req.query.search.indexOf('(') > -1){
        query = req.query.search.slice(0,req.query.search.indexOf('(')-1)
      }
    }
    req.session.data.user='provider'
    res.render(base_url + 'vacancies', {
      "search" : query,
      }
    )
  })
  router.post('/' + base_url + 'dashboard-no-js', function (req, res) {
    // to insure no js version of search works.
    console.log(req.body)
    if(req.body.search){
      res.redirect(301, '/' + base_url + 'dashboard-no-js'+'?search='+req.body.search)
    }else{
      res.redirect(301, '/' + base_url + 'dashboard-no-js')
    }

  })

  router.post('/' + base_url + 'notifications/notification-preferences-new', function (req, res) {
    // to insure no js version of search works.
    if(req.body){
      req.session.data.has_notifications="yes";
      res.redirect(301, '/' + base_url + 'notifications/notificaiton-confirmation?notifications_updated=no')
    }else{
      req.session.data.has_notifications=="no";
      res.redirect(301, '/' + base_url + 'notifications/dashboard')
    }

  })
  router.post('/' + base_url + 'notifications/notification-preferences', function (req, res) {
    // to insure no js version of search works.
    console.log(req.body.notifications == "_unchecked")
    if(req.body.notifications != "_unchecked"){
      res.redirect(301, '/' + base_url + 'notifications/notificaiton-confirmation?notifications_updated=yes')
    }else{
      req.session.data.has_notifications = 'no'
      res.redirect(301, '/' + base_url + 'notifications/notificaiton-confirmation-unsubscribe?notifications_updated=yes')
    }

  })
  router.post('/' + base_url + 'notifications/notificaiton-confirmation*', function (req, res) {
    if(req.session.data.user == "provider"){
        res.redirect(301, '/' + base_url + 'dashboard')
    }else{
        res.redirect(301, '/' + base_url + 'vacancies?filter=any&user=employer')
    }

  })

  router.post('/' + base_url + 'notifications/unsubscribe', function (req, res) {
    if(req.body.confirm_unsubscribe == "yes"){
        req.session.data.has_notifications = 'no'
        res.redirect(301, '/' + base_url + 'notifications/notificaiton-confirmation-unsubscribe')
    }else{
        res.redirect(301, '/' + base_url + 'notifications/notification-preferences')
    }

  })
  router.post('/' + base_url + 'notifications/receive-notifications', function (req, res) {
    req.session.data.force_notifcation_setup = 'no'
    if(req.body.receive_notification == "no"){
        if(req.session.data.user == "employer"){
          res.redirect(301, '/' + base_url + 'vacancies')
        }else{
          res.redirect(301, '/' + base_url + 'dashboard')
        }
    }else{
        res.redirect(301, '/' + base_url + 'notifications/notification-preferences-new')
    }

  })

  router.get('/' + base_url + 'emails/email-templates', function (req, res) {
    notifyClient
      .getAllTemplates('email')
      .then((response) => {
        res.render(base_url + 'emails/email-templates', {
          "emails" : response.body.templates
          }
        )
      })
      .catch((err) => console.error(err))


  })

  router.get('/' + base_url + 'emails/email', function (req, res) {
    var personalisation = {
      'name': 'Bill Shoggins',
      'vacancy ref': 'VAC100000299',
      'employer name': 'NHS England',
      'vacancy title': 'Engineering Technician Level 3 Product Design and Development Apprentice',
      'number' : 3
   }
    notifyClient
      .previewTemplateById(req.query.templateId,personalisation)
      .then((response) => {
        var x = /^# (.*?)\r\n/g
        var email = response.body
        var header = x.exec(response.body.body)
        res.render(base_url + 'emails/email', {
          "html" : response.body.html,
          "email" : email,
          "body" : response.body.body,
          "header" : header
          }
        )
      })
      .catch((err) => console.error(err))


  })








}
