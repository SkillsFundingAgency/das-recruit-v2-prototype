module.exports = function (router) {



  // CHANGE VERSION TO THE VERSION
  var version = '0-1-6'
  var base_url = 'raa-v2/' + version + "/dashboard/"
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

  router.get('/' + base_url + 'vacancies', function (req, res) {
    var query
    if (req.query.search){
      query = req.query.search.slice(0,req.query.search.indexOf('(')-1)
    }
    req.session.data.user="provider"
    res.render(base_url + '/vacancies', {
      "search" : query,
      }
    )
  })





}
