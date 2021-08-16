module.exports = function (router) {

  // CHANGE VERSION TO THE VERSION
  var version = '0-1-8'
  var base_url = 'raa-v2/' + version + "/RVBD-22-commitments"
  var moment = require('moment');

  router.get('/' + base_url + '*', function (req, res,next) {
    console.log("howdy")
    return next()
  })
  router.post('/' + base_url + '/account/application-new', function (req, res) {


    if(req.body.outcome == "successful"){
        res.redirect(301, '/' + base_url + '/account/confirm-outcome?state=successful')
    }else{
      res.redirect(301, '/' + base_url + '/account/confirm-outcome?state=unsuccessful')
    }

  })
  router.post('/' + base_url + '/account/confirm-outcome', function (req, res) {

    if(req.body.addApprentice == "yes"){
      // redirect user to commitments.
      res.redirect(301, req.session.data.commitment_redirect)
    }else{
      res.redirect(301, '/' + base_url + '/account/manage-vacancy?alert=yes&state='+req.query.state)
    }

  })
  // router.post('/' + base_url + '/*/create-vacancy-options/confirm-employer', function (req, res) {
  //   res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create-vacancy-options/location')
  // })






}
