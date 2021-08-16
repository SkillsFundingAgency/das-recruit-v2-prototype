module.exports = function (router) {

  // CHANGE VERSION TO THE VERSION
  var version = '0-1-6'
  var base_url = 'raa-v2/' + version + "/disability-confident/"
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
  router.post('/' + base_url + '*/location', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/disability')
  })

  router.post('/' + base_url + '*/disability', function (req, res) {
    console.log(req.body)
    if(req.body.disability_confident_signed=="yes"){
      res.redirect(301, '/' + base_url + req.params[0] + '/disability-vacancy-check')
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + '/training')
    }
  })

  router.post('/' + base_url + '*/disability-vacancy-check', function (req, res) {
    req.session.data.edit="no";
    if(req.query.edit=="yes"){
      console.log(req.session.data.is_disability_confident)
      res.redirect(301, '/' + base_url + 'vacancy-preview/vacancy-preview')
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + '/training')
    }
  })



}
