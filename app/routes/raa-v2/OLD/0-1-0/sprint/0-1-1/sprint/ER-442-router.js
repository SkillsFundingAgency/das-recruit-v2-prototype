module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-1'
  var base_url = 'raa-v2/' + version + '/sprint/ER-442';
  var vacancies = require('../../../../data/vacancies.json')
  var locations = ["Abingdon", "Accrington", "Ashton-under-Lyne", "Askern", "Axminster", "Aylesbury", "Aylsham", "Bacup", "Bakewell", "Baldock", "Banbury", "Barrow-in-Furness", "Barton-upon-Humber", "Basildon", "Basingstoke", "Bath", "Bingham", "Birmingham", "Bishop Auckland", "Blackburn", "Blackpool", "Blandford Forum", "Bletchley", "Blyth", "Bodmin", "Bracknell", "Bradford", "Budleigh Salterton", "Bungay", "Buntingford", "Caistor", "Calne", "Camberley", "Camborne", "Cambridge", "Camelford", "Chesterfield", "Chester-le-Street", "Chorley", "Christchurch", "Church Stretton", "Coventry", "Crediton", "Crewe", "Dagenham", "Darlington", "Dartford", "Derby", "Dereham", "Droylsden", "Dudley", "Exmouth", "Failsworth", "Farnborough", "Farnham", "Gillingham", "Gloucester", "Godalming", "Keynsham", "Kidderminster", "Leamington Spa", "Lechlade", "London", "Long Eaton", "Ludlow", "Macclesfield", "Middleham", "Middlesbrough", "Middleton", "Newbury", "Newcastle upon Tyne", "Norwich", "Nottingham", "Nuneaton", "Oldbury", "Oldham", "Oxford", "Reading", "Scarborough", "Scunthorpe", "Slough", "Sunderland", "Sutton", "Telford", "Westminster", "Wycombe", "Wymondham"]
  var providers = ['Eurosource Solutions Limited','SBC TRAINING','learndirect Apprenticeships','Lifetime Training','Lifetime Training','University College Birmingham','Coventry University' ]
  // GLOBAL GET ROUTER.
  // Code here will be called on every page within this version

  router.get('/' + base_url + '*', function (req, res,next) {
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
  router.get('/' + base_url + '/dashboard', function (req, res) {
    res.render(base_url + '/dashboard', {
      "data" : req.session,
      }
    )
  })
  // #employer
  router.get('/' + base_url + '/vacancies3-1', function (req, res) {
    console.log("vacancies")
    console.log("vacancies.length : "+vacancies.length)
    console.log("-------")
    console.log(vacancies[1])
    res.render(base_url + '/vacancies3-1', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query,
      "providers" : providers,
      "vacancies" : vacancies,
      }
    )
  })




}
