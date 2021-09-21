module.exports = function(router) {
  var tools = require('../tools.js')



  // CHANGE VERSION TO THE VERSION
  const version = '0-2-1'
  const base_url = 'raa-v2/' + version + "/RVDB-21-collaboration"
  const file_url = 'raa-v2/' + version + "/recruitment"

  // ---------------
  // NEW
  // ---------------
  router.post('/' + base_url + '*/review/vacancy-review', function(req, res) {
    if(req.body.review_vacancy_outcome == "approve"){
      res.redirect(301, '/' + base_url + req.params[0] + '/review/review-confirmation')
    }

    res.redirect(301, '/' + base_url + req.params[0] + '/review/review-confirmation-rejected')
  })


  // ---------------
  //UPDATED
  // ---------------

}
