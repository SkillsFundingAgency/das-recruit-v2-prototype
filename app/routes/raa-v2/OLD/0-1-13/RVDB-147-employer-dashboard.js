module.exports = function(router) {
  var tools = require('../tools.js')



  // CHANGE VERSION TO THE VERSION
  const version = '0-1-13'
  const base_url = 'raa-v2/' + version + "/RVDB-147-employer-dashboard"
  const file_url = 'raa-v2/' + version + "/recruitment"
  const moment = require('moment');
  const fs = require('fs')

  // ---------------
  // NEW
  // ---------------
  router.post('/' + base_url + '*/receive-notifications', function(req, res) {
    if(req.body.receive_notification == "yes"){
      req.session.data.seen_notification_interupt="yes"
      res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notification-preferences')
    }else{
      req.session.data.seen_notification_interupt="no"
      if(req.session.data.journey=="new"){
        res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-none')
      }else{
        if(req.session.data.user=="provider"){
          res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-multiple')
        }else{
          res.redirect(301, '/' + base_url + req.params[0] + '/vacancies')
        }
      }
    }
    })



  router.post('/' + base_url + '*/create/vacancy-preview', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/create/confirmation')
  })

  // ---------------
  //UPDATED
  // ---------------

}
