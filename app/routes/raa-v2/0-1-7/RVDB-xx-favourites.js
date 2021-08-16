module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-7'
  var base_url = 'raa-v2/' + version + '/RVDB-xx-favourites';
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
    if(req.session.data.has_preselected_training == 'yes' ){
      if(req.session.data.has_preselected_provider == 'yes'){
          if(req.session.data.employerAmount > 1){
            res.redirect(301, '/' + base_url + req.params[0]+"/employer")
          }else{
            res.redirect(301, '/' + base_url + req.params[0]+"/display-name")
          }

      }else{
          if(req.session.data.journey =="new"){
              res.redirect(301, '/' + base_url + req.params[0]+"/provider-question")
          }else{
              res.redirect(301, '/' + base_url + req.params[0]+"/provider-select")
          }

      }
    }
    if(req.session.data.journey =="new"){
      res.redirect(301, '/' + base_url + req.params[0]+"/training-question")
    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/training-select")
    }

  })
  router.post('/' + base_url + '*/training-question', function (req, res) {
    if(req.session.data.hasTrainingProvider=="yes"){
      res.redirect(301, '/' + base_url + req.params[0]+"/training-first-select")
    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/training-help")
    }
  })
  router.post('/' + base_url + '*/provider-question', function (req, res) {
    if(req.session.data.hasTrainingProvider=="yes"){
      res.redirect(301, '/' + base_url + req.params[0]+"/provider-first-select")
    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/provider-help")
    }
  })
  router.post('/' + base_url + '*/provider-select', function (req, res) {
    if(req.body.trainingProvider == "different"){
      res.redirect(301, '/' + base_url + req.params[0]+"/confirm-training-provider")
    }else{
      if(req.session.data.employerAmount > 1){
        res.redirect(301, '/' + base_url + req.params[0]+"/employer")
      }else{
        res.redirect(301, '/' + base_url + req.params[0]+"/display-name")
      }

    }
  })

  router.post('/' + base_url + '*/confirm-training-provider', function (req, res) {
    if(req.session.data.employerAmount > 1){
      res.redirect(301, '/' + base_url + req.params[0]+"/employer")
    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/display-name")
    }
  })

  // Training provider
  router.post('/' + base_url + '*/training-first-select', function (req, res) {
    console.log("working")
    res.redirect(301, '/' + base_url + req.params[0]+"/provider-question")
  })
  // Training provider
  router.post('/' + base_url + '*/training-select', function (req, res) {

    res.redirect(301, '/' + base_url + req.params[0]+"/provider-select")
  })
  router.post('/' + base_url + '*/display-name', function (req, res) {

    res.redirect(301, '/' + base_url + req.params[0]+"/location")
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
