module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-1'
  var base_url = 'raa-v2/' + version + '/sprint/ER-487';
  var locations = ["Abingdon", "Accrington", "Ashton-under-Lyne", "Askern", "Axminster", "Aylesbury", "Aylsham", "Bacup", "Bakewell", "Baldock", "Banbury", "Barrow-in-Furness", "Barton-upon-Humber", "Basildon", "Basingstoke", "Bath", "Bingham", "Birmingham", "Bishop Auckland", "Blackburn", "Blackpool", "Blandford Forum", "Bletchley", "Blyth", "Bodmin", "Bracknell", "Bradford", "Budleigh Salterton", "Bungay", "Buntingford", "Caistor", "Calne", "Camberley", "Camborne", "Cambridge", "Camelford", "Chesterfield", "Chester-le-Street", "Chorley", "Christchurch", "Church Stretton", "Coventry", "Crediton", "Crewe", "Dagenham", "Darlington", "Dartford", "Derby", "Dereham", "Droylsden", "Dudley", "Exmouth", "Failsworth", "Farnborough", "Farnham", "Gillingham", "Gloucester", "Godalming", "Keynsham", "Kidderminster", "Leamington Spa", "Lechlade", "London", "Long Eaton", "Ludlow", "Macclesfield", "Middleham", "Middlesbrough", "Middleton", "Newbury", "Newcastle upon Tyne", "Norwich", "Nottingham", "Nuneaton", "Oldbury", "Oldham", "Oxford", "Reading", "Scarborough", "Scunthorpe", "Slough", "Sunderland", "Sutton", "Telford", "Westminster", "Wycombe", "Wymondham"]

  // GLOBAL GET ROUTER.
  // code here will be called on every page within this version
  router.get('/' + base_url + '*', function (req, res,next) {
    // ER-487 Added
    req.session.hasTradingName = (req.query.hasTradingName)? req.query.hasTradingName : "no";
    req.session.tradingName = req.session.tradingName || "Acme Lens";
    req.session.orgname = req.session.orgname || "ABC optitions";
    return next()
  })

  // ER-487 Added
  router.post('/' + base_url + '/create-vacancy-options/display-employer', function (req, res) {

    req.session.tradingName =   req.body.tradingName || "Acme Lens";
    req.session.hasTradingName=(req.body.tradingName)? 'yes' : 'no';

    // if(req.body.selected_display_name== "anonymous"){
    //   res.redirect(301, '/' + base_url + '/create-vacancy-options/training-alt')
    // }else{
    //   res.redirect(301, '/' + base_url + '/create-vacancy-options/location-alt')
    // }
    res.redirect(301, '/' + base_url + '/create-vacancy-options/training')
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

    res.render(base_url + '/create-vacancy-options/search-results-preview', {
      "data" : req.session,
      "query": req.query,
      }
    )
  })

  // EMPLOYER | PREVIEW
  router.get('/' + base_url + '/vacancy-preview/vacancy-preview', function (req, res) {
    res.render(base_url + '/vacancy-preview/vacancy-preview', {
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
