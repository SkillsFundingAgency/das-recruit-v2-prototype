module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-1'
  var base_url = 'raa-v2/' + version + '/sprint/ER-324';
  var locations = ["Abingdon", "Accrington", "Ashton-under-Lyne", "Askern", "Axminster", "Aylesbury", "Aylsham", "Bacup", "Bakewell", "Baldock", "Banbury", "Barrow-in-Furness", "Barton-upon-Humber", "Basildon", "Basingstoke", "Bath", "Bingham", "Birmingham", "Bishop Auckland", "Blackburn", "Blackpool", "Blandford Forum", "Bletchley", "Blyth", "Bodmin", "Bracknell", "Bradford", "Budleigh Salterton", "Bungay", "Buntingford", "Caistor", "Calne", "Camberley", "Camborne", "Cambridge", "Camelford", "Chesterfield", "Chester-le-Street", "Chorley", "Christchurch", "Church Stretton", "Coventry", "Crediton", "Crewe", "Dagenham", "Darlington", "Dartford", "Derby", "Dereham", "Droylsden", "Dudley", "Exmouth", "Failsworth", "Farnborough", "Farnham", "Gillingham", "Gloucester", "Godalming", "Keynsham", "Kidderminster", "Leamington Spa", "Lechlade", "London", "Long Eaton", "Ludlow", "Macclesfield", "Middleham", "Middlesbrough", "Middleton", "Newbury", "Newcastle upon Tyne", "Norwich", "Nottingham", "Nuneaton", "Oldbury", "Oldham", "Oxford", "Reading", "Scarborough", "Scunthorpe", "Slough", "Sunderland", "Sutton", "Telford", "Westminster", "Wycombe", "Wymondham"]

  // GLOBAL GET ROUTER.
  // code here will be called on every page within this version
  router.get('/' + base_url + '*', function (req, res,next) {
    // set session info by use of the url paremeters
    if(req.query.alt){req.session.alt=req.query.alt}
    if(req.query.force_notifcation_setup){req.session.force_notifcation_setup=req.query.force_notifcation_setup}
    if(req.query.vacancies){req.session.vacancies=req.query.vacancies}
    if(req.query.has_notifications){req.session.has_notifications=req.query.has_notifications}
    if(req.query.returnDashaboard){req.session.returnDashaboard=req.query.returnDashaboard}
    if(req.query.disability_confident_level){req.session.disability_confident_level = req.query.disability_confident_level}
    if(req.query.employerAmount){req.session.employerAmount=req.query.employerAmount}
    if(req.query.ApplicationMethod){req.session.ApplicationMethod=req.query.ApplicationMethod}
    if(req.query.NumberOfEntities){req.session.NumberOfEntities=req.query.NumberOfEntities}
    if(req.query.description_name){req.session.description_name=req.query.description_name}
    if(req.query.hasTradingName){req.session.hasTradingName=req.query.hasTradingName}

    // Set defaults if any session data is not set

    req.session.alt = req.session.alt|| "no"
    req.session.force_notifcation_setup = req.session.force_notifcation_setup || "yes"
    req.session.has_notifications = req.session.has_notifications || "no";
    req.session.vacancies = req.session.vacancies || "multiple";
    req.session.orgName = req.session.orgName  || "ABC opticians"
    req.session.TradingName = req.session.TradingName  || "OpticalRapid"
    req.session.hasTradingName = req.session.hasTradingName || "no";
    req.session.NumberOfEntities = req.session.NumberOfEntities || 88;
    req.session.employerAmount = req.session.employerAmount || 8;
    req.session.providerName = req.session.providerName || "Lifetime Training"
    req.session.description_name =  req.session.description_name || "no"
    req.session.EmployerDescription = req.session.EmployerDescription ||"Founded in 2005, we have a long history of helping businesses become more efficient, saving time and money, and ultimately opening the door to greater productivity. Our process and products have evolved over our 13-year journey, but our mission has remained the same."
    return next()
  })

  router.post('/' + base_url + '/create-vacancy-options/display-employer', function (req, res) {
    req.session.hasTradingName=(req.body.selected_display_name == "tradingName") ? "yes" : "no";
    console.log(req.body.selected_display_name)
    console.log(req.session.hasTradingName)
    console.log(req.body.TradingName)
    req.session.TradingName = req.body.TradingName
    if(req.body.selected_display_name== "anonymous"){
      req.session.description_name = req.body.description_name;
      res.redirect(301, '/' + base_url + '/create-vacancy-options/location-anonymous')
    }else{
      req.session.description_name = "no"
      res.redirect(301, '/' + base_url + '/create-vacancy-options/location')
    }
  })

  // ER-788 Added
  router.get('/' + base_url + '/create-vacancy-options/employer', function (req, res) {
    res.render(base_url + '/create-vacancy-options/employer', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query.query,
      }
    )
  })
  router.get('/' + base_url + '/create-vacancy-options/search-results-preview', function (req, res) {
    req.session.orgName = "ABC opticians"
    if(req.session.alt == "yes"){
      req.session.orgName = "ABC Opticians Nottingham"
    }
    res.render(base_url + '/create-vacancy-options/search-results-preview', {
      "data" : req.session,
      }
    )
  })

  // EMPLOYER | PREVIEW
  router.get('/' + base_url + '/employer/vacancy-preview/vacancy-preview', function (req, res) {
    res.render(base_url + '/employer/vacancy-preview/vacancy-preview', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + base_url + '/vacancy-preview/vacancy-preview', function (req, res) {
    res.redirect(301, '/' + base_url + '/vacancy-preview/confirmation')
  })


  router.post('/' + base_url + '/vacancy-preview/confirmation', function (req, res) {
    console.log(req.session.firstVacancy)
    if(req.session.firstVacancy == "yes"){
      res.redirect(301, '/' + base_url + '/dashboard-one-vacancy');
    }else{
      res.redirect(301, '/' + base_url + '/dashboard')
    }

  })
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
  router.post('/' + base_url + '/vacancy-preview/considerations', function (req, res) {
    req.session.ThingsToConsider = req.body.ThingsToConsider;
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })
  router.post('/' + base_url + '/vacancy-preview/employer-contact-details', function (req, res) {
    req.session.EmployerContactName = req.body.EmployerContactName;
    req.session.EmployerContactEmail = req.body.EmployerContactEmail;
    req.session.EmployerContactPhone = req.body.EmployerContactPhone;
    res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
  })
  // delete
  router.post('/' + base_url + '/vacancy-preview/delete', function (req, res) {
    if(req.body.ConfirmDeletion == "yes"){
      res.redirect(301, '/' + base_url + '/dashboard')
    }else{
      res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
    }
  })

}
