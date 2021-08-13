module.exports = function (router) {



  // CHANGE VERSION TO THE VERSION
  var version = '0-1-6'
  var base_url = 'raa-v2/' + version + "/RVDB-14-search/"
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

  router.get('/' + base_url + 'dashboard-*', function (req, res) {
    var query = req.query.search
    if (query){
      if(req.query.search.indexOf('(') > -1){
        query = req.query.search.slice(0,req.query.search.indexOf('(')-1)
      }
    }
    req.session.data.user='provider'
    res.render(base_url + 'dashboard-' + req.params[0], {
      "search" : query,
      }
    )
  })
  router.post('/' + base_url + 'dashboard-no-js', function (req, res) {
    // to insure no js version of search works.
    console.log(req.body)
    if(req.body.search){
      res.redirect(301, '/' + base_url + 'dashboard-no-js'+'?search='+req.body.search)
    }else{
      res.redirect(301, '/' + base_url + 'dashboard-no-js')
    }

  })





}
