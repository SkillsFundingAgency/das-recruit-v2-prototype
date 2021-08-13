module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-7'
  var base_url = 'raa-v2/' + version + '/new-flow';
  var home_url = 'raa-v2/' + version + '/recruitment';
  var providers = ['Eurosource Solutions Limited','SBC TRAINING','learndirect Apprenticeships','Lifetime Training','Lifetime Training','University College Birmingham','Coventry University' ]
  var dates = ['1 Mar 2019','23 Apr 2019','30 Apr 2019','9 May 2019','16 May 2019','24 Jun 2019','11 Jul 2019','12 Jul 2019','28 Aug 2019','13 Nov 2019']
// GLOBAL GET ROUTER.
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
  router.post('/' + base_url + '*/config', function (req, res) {
    console.log("workning from new-flow.js")
    req.session.data.providerName = req.session.data.orgName
    req.session.data.employers_list = getEmployersList(req.session.data.employers,req.session.data.employerAmount)
    res.redirect(301, '/' + base_url + req.params[0] + '/home')
  })
  router.get('/' + base_url + '*/vacancies', function (req, res) {
    console.log("working")
    var query = req.query.search
    if (query){
      if(req.query.search.indexOf('(') > -1){
        query = req.query.search.slice(0,req.query.search.indexOf('(')-1)
      }
    }
    console.log(req.session.data.vacancies)
    res.render(base_url + req.params[0]+ '/vacancies', {
      "search" : query,
      }
    )
  })
  // title and number of vacancies (employer only)
  router.post('/' + base_url + '*/title', function (req, res) {
    res.redirect(301, '/'   + base_url + req.params[0]+"/positions")
  })
  router.post('/' + base_url + '*/positions', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/training-level")
  })
  router.post('/' + base_url + '*/training-level', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/select-training-provider")
  })
  router.post('/' + base_url + '*/disability', function (req, res) {

    if(req.body.disability_confident_signed=='yes'){
      res.redirect(301, '/' + base_url + '/create/disability-vacancy-check')
    }else{
        res.redirect(301, '/' + base_url + '/create/dates')
    }
  })
  router.post('/' + base_url + '*/disability-vacancy-check', function (req, res) {
    req.session.data.is_disability_confident = (req.body.disability_confident_level) ? "yes" : "no"
    res.redirect(301, '/' + base_url + '/create/dates')
  })
  router.post('/' + base_url + '/create/dates', function (req, res) {

    if(req.body.continueButton){
      res.redirect(301, '/' + base_url + '/create/duration')
    }else{
      res.redirect(301, '/' + base_url + '/create/vacancy-preview')
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

}
