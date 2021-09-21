module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-5'
  var base_url = 'raa-v2/' + version + '/sprint/ER-470-report';

  var locations = require('../../../../data/locations.json')
  var training = require('../../../../data/training.json')
  var vacancies = require('../../../../data/vacancies.json')
  var employers = require('../../../../data/employers.json')
  var providers = ['Eurosource Solutions Limited','SBC TRAINING','learndirect Apprenticeships','Lifetime Training','Lifetime Training','University College Birmingham','Coventry University' ]
  var dates = ['1 Mar 2019','23 Apr 2019','30 Apr 2019','9 May 2019','16 May 2019','24 Jun 2019','11 Jul 2019','12 Jul 2019','28 Aug 2019','13 Nov 2019']
// GLOBAL GET ROUTER.
  // Code here will be called on every page within this version
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
    if(req.query.alt){req.session.alt=req.query.alt}
    if(req.query.force_notifcation_setup){req.session.force_notifcation_setup=req.query.force_notifcation_setup}
    if(req.query.vacancies){req.session.vacancies=req.query.vacancies}
    if(req.query.has_notifications){req.session.has_notifications=req.query.has_notifications}
    if(req.query.returnDashaboard){req.session.returnDashaboard=req.query.returnDashaboard}
    if(req.query.returnDashaboard){req.session.returnDashaboard=req.query.returnDashaboard}
    if(req.query.numberOfEntities){req.session.NumberOfEntities = req.query.numberOfEntities}
    if(req.query.user){req.session.user = req.query.user}
    if(req.query.employerAmount){req.session.employerAmount=req.query.employerAmount}
    // Set defaults if any session data is not set
    req.session.alt = req.session.alt|| "no"
    req.session.force_notifcation_setup = req.session.force_notifcation_setup || "yes"
    req.session.has_notifications = req.session.has_notifications || "no";
    req.session.vacancies = req.session.vacancies || "multiple";
    req.session.orgName = req.session.orgName  || "ABC opticians"
    req.session.hasTradingName = (req.query.hasTradingName)? req.query.hasTradingName : "no";
    req.session.NumberOfEntities = req.session.NumberOfEntities || 4;
    req.session.user = req.session.user  || "provider";
    req.session.employerAmount = req.session.employerAmount || 8;
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
  router.get('/' + base_url + '/vacancies', function (req, res) {
    var empoloyer_title = []
    for(var i in req.session.employers){
      empoloyer_title.push(req.session.employers[i].businessName)

    }
    res.render(base_url + '/vacancies', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query,
      "providers" : providers,
      "vacancies" : vacancies,
      "employers" : empoloyer_title,
      "dates" : dates,
      }
    )
  })
  // -------------------------------
  // #create
  // -------------------------------

  // Added from Disability branch


  router.get('/' + base_url + '/create/tasks', function (req, res) {

    res.render(base_url + '/create/tasks', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  })
  router.get('/' + base_url + '/create/employers-select', function (req, res) {
    if(req.query.employerAmount){
      req.session.employerAmount = req.query.employerAmount

    }
      req.session.employers = getEmployersList(req.session.employerAmount);
    res.render(base_url + '/create/employers-select', {
      "data" : req.session,
      "employers" : employers,
      "query" : req.query,
      }
    )
  })
  router.post('/' + base_url + '/create/employers-select', function (req, res) {
    req.session.currentEmployer =  req.body.selected_organisation_id
    req.session.orgName = req.session.currentEmployer
    if(req.query.route=='clone'){
        res.redirect(301, '/' + base_url + '/create-vacancy-options/create-vacancy')
    }else{
        res.redirect(301, '/' + base_url + '/create/title')
    }

  })

  // #title
  router.get('/' + base_url + '/create/title', function (req, res) {
    res.render(base_url + '/create/title', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  });
  router.post('/' + base_url + '/create/title', function (req, res) {
    req.session.title = req.body.title || "Engineering Apprenticeship"
    if(req.body.continueButton){
      res.redirect(301, '/' + base_url + '/create/positions')
    }else{
      res.redirect(301, '/' + base_url + '/create/vacancy-preview')
    }

  });


  // #positions
  router.post('/' + base_url + '/create/positions', function (req, res) {
    req.session.numberOfPositions = req.body.numberOfPositions || 1;

    res.redirect(301, '/' + base_url + '/create/training-level')


  });
  router.get('/' + base_url + '/create/training-level', function (req, res) {
    res.render(base_url + '/create/training-level', {
      "data" : req.session,
      "training" : training,
      "query" : req.query.query,
      }
    )
  });
  router.post('/' + base_url + '/create/training-level', function (req, res) {
    req.session.training_standard = req.body.searchClients || "Aerospace engineer, Level: 6 (Standard) ";
    if(req.session.user=="employer"){
      res.redirect(301, '/' + base_url + '/create/select-training-provider')
    }else{
      res.redirect(301, '/' + base_url + '/create/linked-organisation')
    }
  })

  router.get('/' + base_url + '/create/training', function (req, res) {

      req.session.training_standard = req.query.searchClients || "Aerospace engineer, Level: 6 (Standard) ";
    res.render(base_url + '/create/training', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  })
  router.post('/' + base_url + '/create/create-vacancy', function (req, res) {
    if(req.body.create_option == "new"){
      res.redirect(301, '/' + base_url + '/create/title')
    }else{
      res.redirect(301, '/' + base_url + '/create/clone-vacancy')
    }
  })
  // #clone-vacancy
  router.get('/' + base_url + '/create/clone-vacancy', function (req, res) {
    res.render(base_url + '/create/clone-vacancy', {
      "data" : req.session,
      "query" : req.query.query
      }
    )
  })
  // Added from Disability branch
  router.post('/' + base_url + '/create/title', function (req, res) {
    req.session.title = req.body.title || "Engineering Apprenticeship"
    req.session.is_disability_confident = (req.body.disability_confident_level) ? "yes" : "no";
    res.redirect(301, '/' + base_url + '/create/short-description')
  })
  router.post('/' + base_url + '/create/disability-vacancy-check', function (req, res) {
    req.session.is_disability_confident = req.body.disability_confident_level
    req.session.disability_confident_level= req.body.disability_confident_level
    res.redirect(301, '/' + base_url + '/create/dates')
  })
  router.post('/' + base_url + '/create/dates', function (req, res) {

    if(req.body.continueButton){
      res.redirect(301, '/' + base_url + '/create/duration')
    }else{
      res.redirect(301, '/' + base_url + '/create/vacancy-preview')
    }
  })
  // #employer
  router.get('/' + base_url + '/create/linked-organisation', function (req, res) {
    req.session.NumberOfEntities=5
    if(req.session.NumberOfEntities < 2){
      return res.redirect(301, '/' + base_url + '/create/display-name?')
    }
    res.render(base_url + '/create/linked-organisation', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query,
      }
    )
  })
  router.post('/' + base_url + '/create/linked-organisation', function (req, res) {
    req.session.orgName = req.body.selected_organisation_id || "ABC Opticians"
    if(req.body.continueButton){
      res.redirect(301, '/' + base_url + '/create/display-name')
    }
    else{
      res.redirect(301, '/' + base_url + '/create/display-name?edit=yes')
    }

  })

  router.post('/' + base_url + '/create/display-name', function (req, res) {

    req.session.tradingName =   req.query.tradingName || "Acme Lens";
    req.session.hasTradingName=(req.query.tradingName)? 'yes' : 'no';

    if(req.body.continueButton){
      res.redirect(301, '/' + base_url + '/create/location')
    }else{
      res.redirect(301, '/' + base_url + '/create/vacancy-preview')
    }
  })


  router.post('/' + base_url + '/create/disability', function (req, res) {
    if(req.body.disability_confident_signed=='yes'){
      res.redirect(301, '/' + base_url + '/create/disability-vacancy-check')
    }else{
        res.redirect(301, '/' + base_url + '/create/dates')
    }

  })
  router.post('/' + base_url + '/create/short-description', function (req, res) {
    req.session.shortDescription = req.body.shortDescription || "As a Software Developer Apprentice, you will be undertaking a recognised apprenticeship qualification, including Microsoft certifications, at the same time as working as part of the company’s Software Development team."
    if(req.body.continueButton){
      res.redirect(301, '/' + base_url + '/create/long-description')
    }else{
      res.redirect(301, '/' + base_url + '/create/vacancy-preview')
    }

  })
  //search-results-preview
  router.get('/' + base_url + '/create/search-results-preview', function (req, res) {
    req.session.orgname = req.session.orgname || "ABC Opticians"
    res.render(base_url + '/create/search-results-preview', {
      "data" : req.session,
      }
    )
  })

  // -------------------------------
  // #vacancy-preview
  // -------------------------------
  router.get('/' + base_url + '/create/vacancy-preview', function (req, res) {
    res.render(base_url + '/create/vacancy-preview', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + '/create/vacancy-preview', function (req, res) {
    res.redirect(301, '/' + base_url + '/create/confirmation')
  })
  router.get('/' + base_url + '/create/confirmation', function (req, res) {
    res.render(base_url + '/create/confirmation', {
      "data" : req.session,
      }
    )
  })

  // *SKILLS*
  router.get('/' + base_url + '/create/skills', function (req, res) {
    res.render(base_url + '/create/skills', {
      "data" : req.session,

      }
    )
  })
  router.post('/' + base_url + '/create/skills', function (req, res) {
  req.session.Skills = req.body.Skills
  console.log(req.body)
    res.redirect(301, '/' + base_url + '/create/vacancy-preview')
  })

  // *QUALIFICATIONS*
  router.get('/' + base_url + '/create/qualifications', function (req, res) {
    res.render(base_url + '/create/qualifications', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + 'vacancy-preview/qualifications', function (req, res) {
    res.redirect(301, '/' + base_url + '/create/vacancy-preview')
  })
  // *CONSIDERATIONS*
  router.post('/' + base_url + '/create/considerations', function (req, res) {
    req.session.ThingsToConsider = req.body.ThingsToConsider;
    res.redirect(301, '/' + base_url + '/create/vacancy-preview')
  })
  // *CONTACT DETAILS*
  router.post('/' + base_url + '/create/employer-contact-details', function (req, res) {
    req.session.EmployerContactName = req.body.EmployerContactName;
    req.session.EmployerContactEmail = req.body.EmployerContactEmail;
    req.session.EmployerContactPhone = req.body.EmployerContactPhone;
    res.redirect(301, '/' + base_url + '/create/vacancy-preview')
  })
  // DELETE
  router.post('/' + base_url + '/create/delete', function (req, res) {
    if(req.body.ConfirmDeletion == "yes"){
      res.redirect(301, '/' + base_url + '/'+req.session.returnDashaboard)
    }else{
      res.redirect(301, '/' + base_url + '/create/vacancy-preview')
    }
  })
  //#vacancy-description
  router.get('/' + base_url + '/create/vacancy-description', function (req, res) {
    res.render(base_url + '/create/vacancy-description', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + '/create/vacancy-description', function (req, res) {
    req.session.VacancyDescription = req.body.VacancyDescription
    req.session.TrainingDescription = req.body.TrainingDescription
    req.session.OutcomeDescription = req.body.OutcomeDescription
    res.redirect(301, '/' + base_url + '/create/vacancy-preview')
  })
  //#confirmation
  router.post('/' + base_url + '/create/confirmation', function (req, res) {
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
  router.get('/' + base_url + '/reports/dashboard_multiple', function (req, res) {
    res.render(base_url + '/reports/dashboard_multiple', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  })
  router.get('/' + base_url + '/reports/dashboard', function (req, res) {
    res.render(base_url + '/reports/dashboard', {
      "data" : req.session,
      "query" : req.query,
      }
    )
  })
  router.get('/' + base_url + '/reports/period', function (req, res) {
    res.render(base_url + '/reports/period', {
      "data" : req.session,
      "query" : req.query,
      "employers" : req.employers,
      }
    )
  })
  router.get('/' + base_url + '/reports/confirmation', function (req, res) {
    res.render(base_url + '/reports/confirmation', {
      "data" : req.session,
      "query" : req.query,
      "employers" : req.employers,
      }
    )
  })
  router.get('/' + base_url + '/reports/download', function(req, res){
    var filePath = 'public/files/download.csv';
    var fileName = 'download.csv';
    var path = require('path');
    res.download(path.resolve(filePath), 'download.csv');
  });

  router.get('/' + base_url + '/create/*', function (req, res) {
    var url = require('url')
    var path= (url.parse(req.url).pathname)
    var page = path.substr(req.originalUrl.lastIndexOf('/') + 1)
    console.log("get page: "+page)
    res.render(base_url + '/create/'+page, {
      "data" : req.session,
      "query" : req.query,
      "training" : training,
      "locations" : locations,
      }
    )
  });
}
