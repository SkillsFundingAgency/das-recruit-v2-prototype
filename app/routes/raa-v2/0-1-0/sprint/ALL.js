module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-0'
  var employer_base_url = 'raa-v2/' + version + '/sprint/ALL';
  var locations = ["Abingdon", "Accrington", "Ashton-under-Lyne", "Askern", "Axminster", "Aylesbury", "Aylsham", "Bacup", "Bakewell", "Baldock", "Banbury", "Barrow-in-Furness", "Barton-upon-Humber", "Basildon", "Basingstoke", "Bath", "Bingham", "Birmingham", "Bishop Auckland", "Blackburn", "Blackpool", "Blandford Forum", "Bletchley", "Blyth", "Bodmin", "Bracknell", "Bradford", "Budleigh Salterton", "Bungay", "Buntingford", "Caistor", "Calne", "Camberley", "Camborne", "Cambridge", "Camelford", "Chesterfield", "Chester-le-Street", "Chorley", "Christchurch", "Church Stretton", "Coventry", "Crediton", "Crewe", "Dagenham", "Darlington", "Dartford", "Derby", "Dereham", "Droylsden", "Dudley", "Exmouth", "Failsworth", "Farnborough", "Farnham", "Gillingham", "Gloucester", "Godalming", "Keynsham", "Kidderminster", "Leamington Spa", "Lechlade", "London", "Long Eaton", "Ludlow", "Macclesfield", "Middleham", "Middlesbrough", "Middleton", "Newbury", "Newcastle upon Tyne", "Norwich", "Nottingham", "Nuneaton", "Oldbury", "Oldham", "Oxford", "Reading", "Scarborough", "Scunthorpe", "Slough", "Sunderland", "Sutton", "Telford", "Westminster", "Wycombe", "Wymondham"]

  // GLOBAL GET ROUTER.
  // Code here will be called on every page within this version
  router.get('/' + employer_base_url + '*', function (req, res,next) {
    // set session info by use of the url paremeters
    if(req.query.alt){req.session.alt=req.query.alt}
    if(req.query.force_notifcation_setup){req.session.force_notifcation_setup=req.query.force_notifcation_setup}
    if(req.query.vacancies){req.session.vacancies=req.query.vacancies}
    if(req.query.has_notifications){req.session.has_notifications=req.query.has_notifications}
    if(req.query.returnDashaboard){req.session.returnDashaboard=req.query.returnDashaboard}
    // Set defaults if any session data is not set
    req.session.alt = req.session.alt|| "no"
    req.session.force_notifcation_setup = req.session.force_notifcation_setup || "yes"
    req.session.has_notifications = req.session.has_notifications || "no";
    req.session.vacancies = req.session.vacancies || "multiple";


    return next()
  })
  // -------------------------------
  // #Dashboards
  // -------------------------------
  router.get('/' + employer_base_url + '/dashboard', function (req, res) {
    res.render(employer_base_url + '/dashboard', {
      "data" : req.session,
      }
    )
  })
  // -------------------------------
  // #create-vacancy-options
  // -------------------------------

  // #create-vacancy
  router.get('/' + employer_base_url + '/create-vacancy-options/create-vacancy', function (req, res) {
    res.render(employer_base_url + '/create-vacancy-options/create-vacancy', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + employer_base_url + '/create-vacancy-options/create-vacancy', function (req, res) {
    if(req.body.create_option == "new"){
      res.redirect(301, '/' + employer_base_url + '/create-vacancy-options/title')
    }else{
      res.redirect(301, '/' + employer_base_url + '/create-vacancy-options/clone-vacancy')
    }
  })
  // #clone-vacancy
  router.get('/' + employer_base_url + '/create-vacancy-options/clone-vacancy', function (req, res) {
    res.render(employer_base_url + '/create-vacancy-options/clone-vacancy', {
      "data" : req.session,
      "query" : req.query.query
      }
    )
  })
  // #employer
  router.get('/' + employer_base_url + '/create-vacancy-options/employer', function (req, res) {
    res.render(employer_base_url + '/create-vacancy-options/employer', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query.query,
      }
    )
  })
  //search-results-preview
  router.get('/' + employer_base_url + '/create-vacancy-options/search-results-preview', function (req, res) {
    req.session.orgname = "Organisation"
    if(req.session.alt == "yes"){
      req.session.orgname = "ABC Opticians Nottingham"
    }
    res.render(employer_base_url + '/create-vacancy-options/search-results-preview', {
      "data" : req.session,
      }
    )
  })

  // -------------------------------
  // #vacancy-preview
  // -------------------------------
  router.get('/' + employer_base_url + '/employer/vacancy-preview/vacancy-preview', function (req, res) {
    res.render(employer_base_url + '/employer/vacancy-preview/vacancy-preview', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + employer_base_url + '/vacancy-preview/vacancy-preview', function (req, res) {
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview/confirmation')
  })
  router.get('/' + employer_base_url + '/employer/vacancy-preview/confirmation', function (req, res) {
    res.render(employer_base_url + '/employer/vacancy-preview/confirmation', {
      "data" : req.session,
      }
    )
  })

  // *SKILLS*
  router.get('/' + employer_base_url + '/vacancy-preview/skills', function (req, res) {
    res.render(employer_base_url + '/vacancy-preview/skills', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + employer_base_url + '/vacancy-preview/skills', function (req, res) {
  req.session.Skills = req.body.Skills
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview/vacancy-preview')
  })

  // *QUALIFICATIONS*
  router.get('/' + employer_base_url + '/vacancy-preview/qualifications', function (req, res) {
    res.render(employer_base_url + '/vacancy-preview/qualifications', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + employer_base_url + 'vacancy-preview/qualifications', function (req, res) {
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview/vacancy-preview')
  })
  // *CONSIDERATIONS*
  router.post('/' + employer_base_url + '/vacancy-preview/considerations', function (req, res) {
    req.session.ThingsToConsider = req.body.ThingsToConsider;
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview/vacancy-preview')
  })
  // *CONTACT DETAILS*
  router.post('/' + employer_base_url + '/vacancy-preview/employer-contact-details', function (req, res) {
    req.session.EmployerContactName = req.body.EmployerContactName;
    req.session.EmployerContactEmail = req.body.EmployerContactEmail;
    req.session.EmployerContactPhone = req.body.EmployerContactPhone;
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview/vacancy-preview')
  })
  // DELETE
  router.post('/' + employer_base_url + '/vacancy-preview/delete', function (req, res) {
    if(req.body.ConfirmDeletion == "yes"){
      res.redirect(301, '/' + employer_base_url + '/'+req.session.returnDashaboard)
    }else{
      res.redirect(301, '/' + employer_base_url + '/vacancy-preview/vacancy-preview')
    }
  })
  //#vacancy-description
  router.get('/' + employer_base_url + '/vacancy-preview/vacancy-description', function (req, res) {
    res.render(employer_base_url + '/vacancy-preview/vacancy-description', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + employer_base_url + '/vacancy-preview/vacancy-description', function (req, res) {
    req.session.VacancyDescription = req.body.VacancyDescription
    req.session.TrainingDescription = req.body.TrainingDescription
    req.session.OutcomeDescription = req.body.OutcomeDescription
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview/vacancy-preview')
  })
  //#confirmation
  router.post('/' + employer_base_url + '/vacancy-preview/confirmation', function (req, res) {
    if(req.session.force_notifcation_setup == "yes" && req.session.has_notifications == "no"){
        res.redirect(301, '/' + employer_base_url + '/notifications/receive-notifications');
    }else{
      res.redirect(301, '/' + employer_base_url + '/dashboard-'+req.session.vacancies)
    }
  })
  // -------------------------------
  // #NOTIFCATIONS
  // -------------------------------
  router.post('/' + employer_base_url + '/notifications/receive-notifications', function (req, res) {
    if(req.body.receive_notification == "yes"){
      req.session.receive_notification = 'yes'
      req.session.has_notifications = 'no'
      res.redirect(301, '/' + employer_base_url + '/notifications/notification-preferences-new');
    }else{
      res.redirect(301, '/' + employer_base_url + '/dashboard-'+req.session.vacancies)
    }
  })
  router.get('/' + employer_base_url + '/notifications/notification-preferences', function (req, res) {
    var page=employer_base_url + "/notifications/notification-preferences"

    if(req.session.has_notifications == "no"){
      page= employer_base_url + '/notifications/notification-preferences-new'
    }
    res.render(page , {
      "data" : req.session,
      "new" : req.query.new,
      }
    )
  })
  router.post('/' + employer_base_url + '/notifications/notification-preferences', function (req, res) {
    if(req.body.receive_notification != "_unchecked"){
      req.session.force_notifcation_setup = "no"
      req.session.has_notifications = "yes"
      res.redirect(301, '/' + employer_base_url + '/notifications/notificaiton-confirmation?new=no')
    }else{
      req.session.has_notifications = "no"
      res.redirect(301, '/' + employer_base_url + '/notifications/notificaiton-confirmation-unsubscribe')
    }
  })

  router.post('/' + employer_base_url + '/notifications/notification-preferences-new', function (req, res) {
    if(req.body.receive_notification){
      req.session.force_notifcation_setup = "no"
      req.session.has_notifications = "yes"
    }
    res.redirect(301, '/' + employer_base_url + '/notifications/notificaiton-confirmation?new=yes')

  })


  router.get('/' + employer_base_url + '/notifications/notificaiton-confirmation', function (req, res) {
    res.render(employer_base_url + '/notifications/notificaiton-confirmation', {
      "data" : req.session,
      "new" : req.query.new,
      }
    )
  })
  router.post('/' + employer_base_url + '/notifications/notificaiton-confirmation', function (req, res) {
    res.redirect(301, '/' + employer_base_url + '/dashboard-'+req.session.vacancies)
  })
  router.post('/' + employer_base_url + '/notifications/notificaiton-confirmation-unsubscribe', function (req, res) {
    res.redirect(301, '/' + employer_base_url + '/dashboard-'+req.session.vacancies)
  })



}
