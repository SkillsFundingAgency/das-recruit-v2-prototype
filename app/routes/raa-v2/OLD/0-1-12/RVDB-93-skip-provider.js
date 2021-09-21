module.exports = function(router) {
  var tools = require('../tools.js')
  // CHANGE VERSION TO THE VERSION
  const version = '0-1-12'
  const base_url = 'raa-v2/' + version + "/RVDB-93-skip-provider"
  const file_url = 'raa-v2/' + version + "/recruitment"
  const moment = require('moment');
  const fs = require('fs')

  // ---------------
  // NEW
  // ---------------
  router.post('/' + base_url + '*/create/confirm-training-provider', function(req, res) {
    if(req.session.data.change == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + '../account/preview-edit?change=no')
    }
    else if(req.session.data.edit == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview?edit=no')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/positions')
  })

  router.post('/' + base_url + '*/create/vacancy-preview', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/create/confirmation')
  })

  // ---------------
  //UPDATED
  // ---------------

}
