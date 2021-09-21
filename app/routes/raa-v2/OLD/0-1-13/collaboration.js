module.exports = function(router) {
  var tools = require('../tools.js')



  // CHANGE VERSION TO THE VERSION
  const version = '0-1-13'
  const base_url = 'raa-v2/' + version + "/collaboration"
  const file_url = 'raa-v2/' + version + "/recruitment"
  const moment = require('moment');
  const fs = require('fs')

  // ---------------
  // NEW
  // ---------------
  router.post('/' + base_url + '*/vacancy-review', function(req, res) {
    if(req.body.review_vacancy_outcome == "approve"){
      res.redirect(301, '/' + base_url + req.params[0] + '/review-confirmation')
    }

    res.redirect(301, '/' + base_url + req.params[0] + '/review-confirmation-rejected')
  })

  router.post('/' + base_url + '*/create/vacancy-preview', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/create/confirmation')
  })

  // ---------------
  //UPDATED
  // ---------------

}
