module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-4'
  var base_url = 'raa-v2/' + version + '/sprint/ALL';

  var locations = require('../../../../data/locations.json')
  var training = require('../../../../data/training.json')
  var vacancies = require('../../../../data/vacancies.json')
// GLOBAL GET ROUTER.
  // Code here will be called on every page within this version

  router.get('/' + base_url + '*', function (req, res,next) {
    // set session info by use of the url paremeters
    if(req.query.alt){req.session.alt=req.query.alt}
    if(req.query.force_notifcation_setup){req.session.force_notifcation_setup=req.query.force_notifcation_setup}
    if(req.query.vacancies){req.session.vacancies=req.query.vacancies}
    if(req.query.has_notifications){req.session.has_notifications=req.query.has_notifications}
    if(req.query.returnDashaboard){req.session.returnDashaboard=req.query.returnDashaboard}
    if(req.query.disability_confident_level){req.session.disability_confident_level = req.query.disability_confident_level}
    // Set defaults if any session data is not set
    req.session.alt = req.session.alt|| "no"
    req.session.force_notifcation_setup = req.session.force_notifcation_setup || "yes"
    req.session.has_notifications = req.session.has_notifications || "no";
    req.session.vacancies = req.session.vacancies || "multiple";
    req.session.orgName = req.session.orgName  || "ABC opticians"
    req.session.hasTradingName = (req.query.hasTradingName)? req.query.hasTradingName : "no";
    req.session.NumberOfEntities = req.session.NumberOfEntities || 88
    return next()
  })
  // -------------------------------
  // #config
  // -------------------------------
  router.post('/' + base_url + '/config', function (req, res) {
    var page = 'dashboard-'+req.body.journey;
    console.log(req.body)
    req.session.NumberOfEntities = req.body.NumberOfEntities || 88;
    req.session.orgName = req.body.orgName;
    res.redirect(301, '/' + base_url + '/'+page)
  })
  // -------------------------------
  // #Dashboards
  // -------------------------------
  router.get('/' + base_url + '/dashboard', function (req, res) {
    res.render(base_url + '/dashboard', {
      "data" : req.session,
      }
    )
  })
  // -------------------------------
  // #create-vacancy-options
  // -------------------------------

  // #create-vacancy
  router.get('/' + base_url + '/create-vacancy-options/create-vacancy', function (req, res) {
    res.render(base_url + '/create-vacancy-options/create-vacancy', {
      "data" : req.session,
      }
    )
  })
  // Added from Disability branch
  router.post('/' + base_url + '/create-vacancy-options/title', function (req, res) {
    req.session.title = req.body.title || "Engineering Apprenticeship"
    req.session.is_disability_confident = (req.body.disability_confident_level) ? "yes" : "no";
    req.session.disability_confident_level = req.body.disability_confident_level;
    res.redirect(301, '/' + base_url + '/create-vacancy-options/training-level')
  })

  router.post('/' + base_url + '/create-vacancy-options/training-level', function (req, res) {
    req.session.training_standard = req.query.searchClients || "Aerospace engineer, Level: 6 (Standard) ";
    res.redirect(301, '/' + base_url + '/create-vacancy-options/training')
  })

  router.get('/' + base_url + '/create-vacancy-options/training-level', function (req, res) {
    res.render(base_url + '/create-vacancy-options/training-level', {
      "data" : req.session,
      "training" : training,
      "query" : req.query.query,
      }
    )
  })
  router.get('/' + base_url + '/create-vacancy-options/display-employer', function (req, res) {
    res.render(base_url + '/create-vacancy-options/display-employer', {
      "data" : req.session,
      "training" : training,
      "query" : req.query.query,
      }
    )
  })
  router.get('/' + base_url + '/create-vacancy-options/training', function (req, res) {

      req.session.training_standard = req.query.searchClients || "Aerospace engineer, Level: 6 (Standard) ";
    res.render(base_url + '/create-vacancy-options/training', {
      "data" : req.session,
      "query" : req.query,
      }
    )
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
  // Added from Disability branch
  router.post('/' + base_url + '/create-vacancy-options/title', function (req, res) {
    req.session.title = req.body.title || "Engineering Apprenticeship"
    req.session.is_disability_confident = (req.body.disability_confident_level) ? "yes" : "no";
    res.redirect(301, '/' + base_url + '/create-vacancy-options/short-description')
  })
  // #employer
  router.get('/' + base_url + '/create-vacancy-options/employer', function (req, res) {
    if(req.session.NumberOfEntities < 2){
      return res.redirect(301, '/' + base_url + '/create-vacancy-options/location')
    }
    res.render(base_url + '/create-vacancy-options/employer', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query.query,
      }
    )
  })
  router.post('/' + base_url + '/create-vacancy-options/employer', function (req, res) {
    console.log(req.body.selected_organisation_id)
    req.session.orgname = req.body.selected_organisation_id || "ABC Opticians"
    res.redirect(301, '/' + base_url + '/create-vacancy-options/location')
  })

  router.post('/' + base_url + '/create-vacancy-options/display-employer', function (req, res) {

    req.session.tradingName =   req.query.tradingName || "Acme Lens";
    req.session.hasTradingName=(req.query.tradingName)? 'yes' : 'no';

    res.redirect(301, '/' + base_url + '/create-vacancy-options/short-description')
  })
  router.post('/' + base_url + '/create-vacancy-options/short-description', function (req, res) {
    req.session.shortDescription = req.body.shortDescription || "ABC Opticians"
    res.redirect(301, '/' + base_url + '/create-vacancy-options/search-results-preview')
  })
  //search-results-preview
  router.get('/' + base_url + '/create-vacancy-options/search-results-preview', function (req, res) {
    req.session.orgname = req.session.orgname || "ABC Opticians"
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
  router.get('/' + base_url + '/vacancy-preview/confirmation', function (req, res) {
    res.render(base_url + '/vacancy-preview/confirmation', {
      "data" : req.session,
      }
    )
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
  // *CONTACT DETAILS*
  router.post('/' + base_url + '/vacancy-preview/employer-contact-details', function (req, res) {
    req.session.EmployerContactName = req.body.EmployerContactName;
    req.session.EmployerContactEmail = req.body.EmployerContactEmail;
    req.session.EmployerContactPhone = req.body.EmployerContactPhone;
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })
  // DELETE
  router.post('/' + base_url + '/vacancy-preview/delete', function (req, res) {
    if(req.body.ConfirmDeletion == "yes"){
      res.redirect(301, '/' + base_url + '/'+req.session.returnDashaboard)
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
  //#confirmation
  router.post('/' + base_url + '/vacancy-preview/confirmation', function (req, res) {
    if(req.session.force_notifcation_setup == "yes" && req.session.has_notifications == "no"){
        res.redirect(301, '/' + base_url + '/notifications/receive-notifications');
    }else{
      res.redirect(301, '/' + base_url + '/dashboard-'+req.session.vacancies)
    }
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



}
