module.exports = function (router) {


  // CHANGE VERSION TO THE VERSION
  var version = '0-1-5'
  var base_url = 'raa-v2/' + version + "/sprint"
  var moment = require('moment');


  function getEmployersList($amount){
    var newEmployersList = []
    var rand
    for(var i=0;i<$amount;i++){
      var rand = employers[Math.floor(Math.random() * employers.length)];
      newEmployersList.push(rand)
    }
    return newEmployersList
  }
  router.get('/' + base_url + '*', function (req, res,next) {
    // set session info by use of the url paremeters
    req.session.employers = req.session.employers || getEmployersList(req.session.employerAmount);

    return next()
  })
  // -------------------------------
  // #config
  // -------------------------------
  router.post('/' + base_url + '/config', function (req, res) {
    req.session.journey = req.body.journey;
    req.session.providerName = req.body.providerName;
    req.session.employerAmount = req.body.employerAmount  || 8
    req.session.employers = getEmployersList(req.session.employerAmount);
    res.redirect(301, '/' + base_url + '/home')
  })
  // -------------------------------
  // #Dashboards
  // -------------------------------
  router.get('/' + base_url + '*/title', function (req, res) {
    var currentMonth = moment().format('Do MMM YYYY')
    console.log(req.session.data.locations)
    res.render(base_url + req.params[0]+"/title")
  })
  router.get('/' + base_url + '*/title2', function (req, res) {
    console.log(req.session.data)
    res.render(base_url + req.params[0]+"/title2")
  })
  router.post('/' + base_url + '*/title', function (req, res) {
    console.log(req.session.data.locations)
    res.redirect(301, '/' + base_url + req.params[0]+"/title2")
  })

  // create a vacancy (employer only)
  router.post('/' + base_url + '/*/create-vacancy-options/create-vacancy', function (req, res) {
    if(req.session.data.create_option=="new"){
      res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/title')
    }else{
      res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/clone-vacancy')
    }

  })

  router.get('/' + base_url + '/home', function (req, res) {
    console.log("WORKING!!")
    req.session.hello="goodbye"
    res.render(base_url + '/home', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  })
  router.get('/' + base_url + '/preview', function (req, res) {
    res.render(base_url + '/preview', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  })


  router.get('/' + base_url + '/dashboard', function (req, res) {
    res.render(base_url + '/dashboard', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query,
      "providers" : providers,
      "vacancies" : vacancies,
      }
    )
  })
  // router.get('/' + base_url + '/dashboard-multiple', function (req, res) {
  //   var empoloyer_title = []
  //   for(var i in req.session.employers){
  //     empoloyer_title.push(req.session.employers[i].businessName)
  //
  //   }
  //   res.render(base_url + '/dashboard-multiple', {
  //     "data" : req.session,
  //     "locations" : locations,
  //     "query" : req.query,
  //     "providers" : providers,
  //     "vacancies" : vacancies,
  //     "dates" : dates,
  //     "employers" : empoloyer_title,
  //     }
  //   )
  // })
  // router.get('/' + base_url + '/dashboard-multiple*', function (req, res) {
  //   var empoloyer_title = []
  //   var v = req.originalUrl.substr(req.originalUrl.length - 1)
  //   for(var i in req.session.employers){empoloyer_title.push(req.session.employers[i].businessName)}
  //   res.render(base_url + '/dashboard-multiple'+v, {
  //     "data" : req.session,
  //     "locations" : locations,
  //     "query" : req.query,
  //     "providers" : providers,
  //     "vacancies" : vacancies,
  //     "employers" : empoloyer_title,
  //     "dates" : dates,
  //     }
  //   )
  // })
  router.get('/' + base_url + '/new-vacancies', function (req, res) {
    console.log("hi")
    res.render(base_url + '/new-vacancies', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query,
      "providers" : providers,
      "vacancies" : vacancies,
      }
    )
  })
  // -------------------------------
  // #create-vacancy-options
  // -------------------------------
  router.get('/' + base_url + '/create-vacancy-options/employers-select', function (req, res) {
    if(req.query.employerAmount){
      req.session.employerAmount = req.query.employerAmount
      req.session.employers = getEmployersList(req.session.employerAmount);
    }
    res.render(base_url + '/create-vacancy-options/employers-select', {
      "data" : req.session,
      "employers" : employers,
      "query" : req.query,
      }
    )
  })
  router.post('/' + base_url + '/create-vacancy-options/employers-select', function (req, res) {
    req.session.currentEmployer =  req.body.selected_organisation_id
    req.session.orgName = req.session.currentEmployer
    if(req.query.route=='clone'){
        res.redirect(301, '/' + base_url + '/create-vacancy-options/create-vacancy')
    }else{
        res.redirect(301, '/' + base_url + '/create-vacancy-options/title')
    }

  })

  // Added from Disability branch
  router.post('/' + base_url + '/create-vacancy-options/title', function (req, res) {
    // console.log(req.body.title )
    // req.session.title = req.body.title || "Engineering Apprenticeship";
    // req.session.numberOfPositions = req.body.numberOfPositions || 1;
    // req.session.is_disability_confident = (req.body.disability_confident_level) ? "yes" : "no";
    // req.session.disability_confident_level = req.body.disability_confident_level;
    res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/test')
  })

  router.post('/' + base_url + '/*/create-vacancy-options/employer', function (req, res) {
    if(req.session.data.employerDetailsSet == "yes"){
      res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/confirm-employer')
    }else{
      res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/set-employer-details')
    }


  })
  router.post('/' + base_url + '/*/create-vacancy-options/confirm-employer', function (req, res) {
    res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/location')
  })
  router.post('/' + base_url +  '/*/create-vacancy-options/display-employer', function (req, res) {
    req.session.hasTradingName=(req.body.selected_display_name == "tradingName") ? "yes" : "no";
    req.session.TradingName = req.body.TradingName
    if(req.body.selected_display_name== "anonymous"){
      req.session.description_name = req.body.description_name || "a high street opticians";
      res.redirect(301, '/' + base_url + '/'+ req.params[0] + '/create-vacancy-options/location-anonymous')
    }else{
      req.session.description_name = "no"
      res.redirect(301, '/' + base_url + '/'+ req.params[0] +  '/create-vacancy-options/location')
    }
  })
  router.post('/' + base_url + '/create-vacancy-options/create-vacancy', function (req, res) {
    if(req.body.create_option == "new"){
      res.redirect(301, '/' + base_url + '/create-vacancy-options/title')
    }else{
      res.redirect(301, '/' + base_url + '/create-vacancy-options/clone-vacancy')
    }
  })
  // #clone-vacancy
  router.get('/' + base_url + '/create-vacancy-options/clone-vacancy', function (req, res) {
    res.render(base_url + '/create-vacancy-options/clone-vacancy', {
      "data" : req.session,
      "query" : req.query.query
      }
    )
  })
  //search-results-preview
  router.get('/' + base_url + '/create-vacancy-options/search-results-preview', function (req, res) {
    req.session.orgname = req.session.orgname || "ABC Opticians"
    console.log(req.session)
    res.render(base_url + '/create-vacancy-options/search-results-preview', {
      "data" : req.session,
      }
    )
  })

  // -------------------------------
  // #vacancy-preview
  // -------------------------------
  router.get('/' + base_url + '/vacancy-preview/vacancy-preview', function (req, res) {
    res.render(base_url + '/vacancy-preview/vacancy-preview', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + '/vacancy-preview/vacancy-preview', function (req, res) {
    res.redirect(301, '/' + base_url + '/vacancy-preview/confirmation')
  })
  // get routing declaration for all pages in /vacancy-preview/ folder
  router.get('/' + base_url + '/vacancy-preview/*', function (req, res) {
    var page = req.originalUrl.substr(req.originalUrl.lastIndexOf('/') + 1)
    console.log(page)
    res.render(base_url + '/vacancy-preview/'+page, {
      "data" : req.session,
      }
    )
  })
  // -------------------------------
  // #vacancy-preview
  // -------------------------------
  router.get('/' + base_url + '/vacancy-preview/vacancy-preview', function (req, res) {
    res.render(base_url + '/vacancy-preview/vacancy-preview', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + '/vacancy-preview/vacancy-preview', function (req, res) {
    res.redirect(301, '/' + base_url + '/vacancy-preview/confirmation')
  })
  // *SKILLS*
  router.get('/' + base_url + '/vacancy-preview/skills', function (req, res) {
    res.render(base_url + '/vacancy-preview/skills', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + '/vacancy-preview/skills', function (req, res) {
  req.session.Skills = req.body.Skills
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })

  // *QUALIFICATIONS*
  router.get('/' + base_url + '/vacancy-preview/qualifications', function (req, res) {
    res.render(base_url + '/vacancy-preview/qualifications', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + 'vacancy-preview/qualifications', function (req, res) {
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })
  // *CONSIDERATIONS*
  router.post('/' + base_url + '/vacancy-preview/considerations', function (req, res) {
    req.session.ThingsToConsider = req.body.ThingsToConsider;
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })
  // *ABOUT EMPLOYER*
  router.post('/' + base_url + '/vacancy-preview/about-employer', function (req, res) {
    req.session.EmployerDescription = req.body.EmployerDescription;
    req.session.EmployerWebsiteUrl = req.body.EmployerWebsiteUrl;
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })
  // *CONTACT DETAILS*
  router.post('/' + base_url + '/vacancy-preview/employer-contact-details', function (req, res) {
    req.session.EmployerContactName = req.body.EmployerContactName
    req.session.EmployerContactEmail = req.body.EmployerContactEmail
    req.session.EmployerContactPhone = req.body.EmployerContactPhone
    if(req.body.EmployerContactName || req.body.EmployerContactName || req.body.EmployerContactPhone){
      req.session.HasEmployerContactDetails="yes"
    }
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })
  // DELETE
  router.post('/' + base_url + '/vacancy-preview/delete', function (req, res) {
    req.session.returnDashaboard = req.session.returnDashaboard || "multiple"
    if(req.body.ConfirmDeletion == "yes"){
      res.redirect(301, '/' + base_url + '/dashboard-'+req.session.returnDashaboard)
    }else{
      res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
    }
  })
  //#vacancy-description
  router.get('/' + base_url + '/vacancy-preview/vacancy-description', function (req, res) {
    res.render(base_url + '/vacancy-preview/vacancy-description', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + '/vacancy-preview/vacancy-description', function (req, res) {
    req.session.VacancyDescription = req.body.VacancyDescription
    req.session.TrainingDescription = req.body.TrainingDescription
    req.session.OutcomeDescription = req.body.OutcomeDescription
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })
  router.post('/' + base_url + '/vacancy-preview/application-process', function (req, res) {
    req.session.ApplicationUrl = req.body.ApplicationUrl
    req.session.ApplicationInstructions = req.body.ApplicationInstructions
    req.session.ApplicationMethod = req.body.ApplicationMethod
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })



  //#confirmation
  router.post('/' + base_url + '/vacancy-preview/confirmation', function (req, res) {
    res.redirect(301, '/' + base_url + '/dashboard-'+req.session.vacancies)
    // if(req.session.force_notifcation_setup == "yes" && req.session.has_notifications == "no"){
    //     res.redirect(301, '/' + base_url + '/notifications/receive-notifications');
    // }else{
    //   res.redirect(301, '/' + base_url + '/dashboard-'+req.session.vacancies)
    // }
  })
  // -------------------------------
  // #NOTIFCATIONS
  // -------------------------------
  router.post('/' + base_url + '/notifications/receive-notifications', function (req, res) {
    if(req.body.receive_notification == "yes"){
      req.session.receive_notification = 'yes'
      req.session.has_notifications = 'no'
      res.redirect(301, '/' + base_url + '/notifications/notification-preferences-new');
    }else{
      res.redirect(301, '/' + base_url + '/dashboard-'+req.session.vacancies)
    }
  })
  router.get('/' + base_url + '/notifications/notification-preferences', function (req, res) {
    var page=base_url + "/notifications/notification-preferences"

    if(req.session.has_notifications == "no"){
      page= base_url + '/notifications/notification-preferences-new'
    }
    res.render(page , {
      "data" : req.session,
      "new" : req.query.new,
      }
    )
  })
  router.post('/' + base_url + '/notifications/notification-preferences', function (req, res) {
    if(req.body.receive_notification != "_unchecked"){
      req.session.force_notifcation_setup = "no"
      req.session.has_notifications = "yes"
      res.redirect(301, '/' + base_url + '/notifications/notificaiton-confirmation?new=no')
    }else{
      req.session.has_notifications = "no"
      res.redirect(301, '/' + base_url + '/notifications/notificaiton-confirmation-unsubscribe')
    }
  })

  router.post('/' + base_url + '/notifications/notification-preferences-new', function (req, res) {
    if(req.body.receive_notification){
      req.session.force_notifcation_setup = "no"
      req.session.has_notifications = "yes"
    }
    res.redirect(301, '/' + base_url + '/notifications/notificaiton-confirmation?new=yes')

  })


  router.get('/' + base_url + '/notifications/notificaiton-confirmation', function (req, res) {
    res.render(base_url + '/notifications/notificaiton-confirmation', {
      "data" : req.session,
      "new" : req.query.new,
      }
    )
  })
  router.post('/' + base_url + '/notifications/notificaiton-confirmation', function (req, res) {
    res.redirect(301, '/' + base_url + '/dashboard-'+req.session.vacancies)
  })
  router.post('/' + base_url + '/notifications/notificaiton-confirmation-unsubscribe', function (req, res) {
    res.redirect(301, '/' + base_url + '/dashboard-'+req.session.vacancies)
  })

  router.post('/' + base_url + '/account/close', function (req, res) {

    if(req.body.ConfirmClose == "true"){
        res.redirect(301, '/' + base_url + '/account/manage-vacancy-closed?alert=yes')
    }else{
      res.redirect(301, '/' + base_url + '/account/manage-vacancy')
    }

  })

  router.get('/' + base_url + '/account/manage-vacancy-closed', function (req, res) {
    res.render(base_url + '/account/manage-vacancy-closed', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  })
  //
  router.get('/' + base_url + '/create-vacancy-options/*', function (req, res) {
    var url = require('url')
    var path= (url.parse(req.url).pathname)
    var page = path.substr(req.originalUrl.lastIndexOf('/') + 1)
    res.render(base_url + '/create-vacancy-options/'+page, {
      "data" : req.session,
      "query" : req.query,
      "training" : training,
      "locations" : locations,
      }
    )
  });
  // router.get('/' + base_url + '/account/*', function (req, res) {
  //   var url = require('url')
  //   var path= (url.parse(req.url).pathname)
  //   var page = path.substr(req.originalUrl.lastIndexOf('/') + 1)
  //   res.render(base_url + '/account/'+page, {
  //     "data" : req.session,
  //     "query" : req.query,
  //     "training" : training,
  //     "locations" : locations,
  //     }
  //   )
  // });





}
