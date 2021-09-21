module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-8'
  var base_url = 'raa-v2/' + version + '/RVDB-40-new-journey-alt/';
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
router.get('/' + base_url + '*/employers-select', function (req, res) {
  req.session.data.employers_list=req.session.data.employers_list || getEmployersList(req.session.data.employers,req.session.data.employerAmount)
  res.render(base_url + req.params[0]+"/employers-select")
})
router.post('/' + base_url + '*/title', function (req, res) {
  res.redirect(301, '/' + base_url + req.params[0]+'/important-dates')

})
router.post('/' + base_url + '*/important-dates', function (req, res) {
  res.redirect(301, '/' + base_url + req.params[0]+'/wages')
})

router.post('/' + base_url + '*/wages', function (req, res) {
  // employerAmount
  if(req.session.data.employerAmount > 1){
    res.redirect(301, '/' + base_url + req.params[0]+'/employer')
  }else{
    res.redirect(301, '/' + base_url + req.params[0]+'/display-name')
  }

})
  router.post('/' + base_url + '*/location', function (req, res) {
    if(req.session.data.journey == 'new'){
        res.redirect(301, '/' +base_url + req.params[0]+'/about-employer')
    }else if(req.session.data.employer == "provider"){
      res.redirect(301, '/' +base_url + req.params[0]+'/select-training-provider')
    }else{
      res.redirect(301, '/' +base_url + req.params[0]+'/long-description')
    }
  })
  router.post('/' + base_url + '*/display-name', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+'/location')
  })

  router.post('/' + base_url + '*/about-employer', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+'/select-training-provider')
  })
  router.post('/' + base_url + '*/confirm-training-provider', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+'/long-description')
  })

  router.post('/' + base_url + '*/long-description', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+'/short-description')
  })
  router.post('/' + base_url + '*/short-description', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+'/skills')
  })

  router.post('/' + base_url + '*/email-templates', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+'/skills')
  })


}
