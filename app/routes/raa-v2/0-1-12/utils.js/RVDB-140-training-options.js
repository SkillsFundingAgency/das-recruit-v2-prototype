module.exports = function(router) {

  // CHANGE VERSION TO THE VERSION
  const version = '0-1-12'
  const base_url = 'raa-v2/' + version + "/RVDB-140-training-options"
  const file_url = 'raa-v2/' + version + "/recruitment"
  const moment = require('moment');
  const fs = require('fs')
  // ---------------
  // Suporting functions (no change)
  // ---------------

  // ---------------
  // New
  // ---------------
  router.post('/' + base_url + '*/create/confirm-training-provider', function(req, res) {
    console.log("sHITE")
      if(req.session.data.edit != "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/training-options");
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }
  })
  router.post('/' + base_url + '*/create/training-options', function(req, res) {
    console.log("sHITE")
    if(req.session.data.edit != "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/positions");
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }
  })


  // ---------------
  // Updated
  // ---------------





}
