module.exports = function (router) {
  // TESTING VERSIONS REMOVE EACH NEW VERSION



  require('./RVDB-89-extra-questions.js')(router)
  require('./RVDB-60-qualifications.js')(router)
  require('./RVDB-70-title-position-split.js')(router)
  require('./RVDB-55-disabilty-confident.js')(router);
  require('./RVDB-46-select-provider.js')(router);
  require('./RVDB-40-new-journey-split.js')(router);
  require('./RVDB-40-new-journey.js')(router);


  // CHANGE VERSION TO THE VERSION
  var version = '0-1-9'
  var base_url = 'raa-v2/' + version + "/"
  var moment = require('moment');

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
  router.get('/' + base_url + '*', function (req, res,next) {
    // Track any changes to employer amount and update the the emloyers list

    if(req.session.data.currentEmployerAmount != req.session.data.employerAmount){
      req.session.data.currentEmployerAmount = req.session.data.employerAmount
      getEmployersList(req.session.data.employers,req.session.data.employerAmount)
    }
    req.session.data.currentEmloyerAmount =req.session.data.currentEmloyerAmount || req.session.data.employerAmount
    return next()
  })

  router.post('/' + base_url + '*/config', function (req, res) {
    req.session.data.providerName = req.session.data.orgName
    req.session.data.employers_list = getEmployersList(req.session.data.employers,req.session.data.employerAmount)
    if(req.body.journey == "new"){
      res.redirect(301, '/' + base_url + req.params[0] + '/none')
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-multiple')
    }

  })
  router.get('/' + base_url + '*/employers-select', function (req, res) {
    req.session.data.employers_list=req.session.data.employers_list || getEmployersList(req.session.data.employers,req.session.data.employerAmount)
    res.render(base_url + req.params[0]+"/employers-select")
  })
  // -------------------------------
  // #Dashboards
  // -------------------------------
  router.get('/' + base_url + '*/dashboard-*', function (req, res) {
    var query = req.query.search
    if (query){
      if(req.query.search.indexOf('(') > -1){
        query = req.query.search.slice(0,req.query.search.indexOf('(')-1)
      }
    }
    res.render(base_url + req.params[0]+ '/dashboard-' + req.params[1], {
      "search" : query,
      }
    )
  })
  // set defualts to 0 for new users
  router.get('/' + base_url + '*/dashboard-none', function (req, res) {
    req.session.data.NumberOfEntities = 0
    req.session.data.employerAmount = 0
    console.log(base_url + req.params[0]+'/dashboard-none')
    res.render(base_url + req.params[0]+'/dashboard-none')
  })
  // -------------------------------
  // #create-vacancy-options
  // -------------------------------
  // create a vacancy
  router.post('/' + base_url + '*/create-vacancy-options/create-vacancy', function (req, res) {
    if(req.session.data.create_option=="new"){
      res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/title')
    }else{
      res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/clone-vacancy')
    }

  })
  // title and number of vacancies (employer only)
  router.post('/' + base_url + '*/title', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/short-description")
  })

  // Short description
  router.post('/' + base_url + '*/short-description', function (req, res) {
    // skip the legal entity page if there user has no other legal entity.
    if(req.session.data.NumberOfEntities < 2){
      res.redirect('/' + base_url + req.params[0]+"/display-employer")
    }else {
      res.redirect(301, '/' + base_url + req.params[0]+"/employer")
    }
  })
  // router.post('/' + base_url + '*/confirm-training-provider', function (req, res) {
  //   // skip the legal entity page if there user has no other legal entity.
  //   if (req.session.data.employerAmount < 1){
  //       res.redirect('/' + base_url + req.params[0]+"/display-employer")
  //   }else {
  //     res.redirect(301, '/' + base_url + req.params[0]+"/employer")
  //   }
  // })



  // employer / Legal entitity select
  router.post('/' + base_url + '*/employer', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/display-employer")
  })

  // Display name
  router.post('/' + base_url + '*/display-employer', function (req, res) {
    if(req.body.selected_display_name== "anonymous"){
      res.redirect(301, '/' + base_url + req.params[0]+'/location-anonymous')
    }else{
      req.session.description_name = "no"
      res.redirect(301, '/' + base_url + req.params[0]+'/location')
    }
  })

  // -------------------------------
  // #vacancy preview
  // -------------------------------
  // vacancy-description
  router.post('/' + base_url + '*/vacancy-description', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview")
  })
  // vacancy-description
  router.post('/' + base_url + '*/skills', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview")
  })
  // considerations
  router.post('/' + base_url + '*/considerations', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview")
  })
  // considerations
  router.post('/' + base_url + '*/qualifications', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview")
  })
  //about-employer
  router.post('/' + base_url + '*/about-employer', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview")
  })

  //application-process
  router.post('/' + base_url + '*/application-process', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview")
  })
  //employer-contact-details
  router.post('/' + base_url + '*/employer-contact-details', function (req, res) {
    req.session.data.HasEmployerContactDetails = (req.body.EmployerContactName || req.body.EmployerContactEmail  || req.body.EmployerContactPhone )? "yes" : "no"
    res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview")
  })
    //Training provider
  router.post('/' + base_url + '*/select-training-providers', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/confirm-training-provider?&UKPRN="+req.body.UKPRN)

  })
  router.post('/' + base_url + '*/confirm-training-provider', function (req, res) {
    res.redirect(301, '/' + base_url  + req.params[0]+"/vacancy-preview")
  })
  //employer-contact-details
  router.post('/' + base_url + '*/vacancy-preview', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/confirmation")
  })


  router.get('/' + base_url + '*/employers-select', function (req, res) {
    req.session.data.user = 'provider'
    if(req.query.employerAmount){
      req.session.employerAmount = req.query.employerAmount
      req.session.employers = getEmployersList(req.session.employerAmount);
    }
    res.render(base_url + req.params[0]+'/employers-select', {
      "data" : req.session,
      "employers" : employers,
      "query" : req.query,
      }
    )
  })
  router.post('/' + base_url + '*/employers-select', function (req, res) {
    req.session.currentEmployer =  req.body.selected_organisation_id
    req.session.orgName = req.session.currentEmployer
    if(req.query.route=='clone'){
        res.redirect(301, '/' + base_url + req.params[0]+'/create-vacancy')
    }else{
        res.redirect(301, '/' + base_url + req.params[0]+'/title')
    }

  })

  // Added from Disability branch
  router.post('/' + base_url + '*/create-vacancy-options/title', function (req, res) {

    res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/short-description')
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
  // DELETE
  router.post('/' + base_url + '*/account/close', function (req, res) {

    if(req.body.ConfirmClose == "true"){
        res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/account/manage-vacancy-closed?alert=yes')
    }else{
      res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/account/manage-vacancy')
    }

  })
  // Vacancy delete
  router.post('/' + base_url + '*/vacancy-preview/delete', function (req, res) {
    if(req.body.ConfirmDeletion == "yes"){
      if(req.session.data.journey=="new" ){
        res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/dashboard-none')
      }else{
        res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/dashboard-multiple')

      }

    }else{
      res.redirect(301,  '/' + base_url + '/'+ req.params[0] +'vacancy-preview/vacancy-preview')
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


  // router.post('/' + base_url + '/*/create-vacancy-options/confirm-employer', function (req, res) {
  //   res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/location')
  // })






}
