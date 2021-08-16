module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var Fuse = require('fuse.js');
  var version = '0-1-10'
  var base_url = 'raa-v2/' + version + '/RVDB-93-skip-provider';
  var home_url = 'raa-v2/' + version + '/recruitment';
  var providers = ['Eurosource Solutions Limited','SBC TRAINING','learndirect Apprenticeships','Lifetime Training','Lifetime Training','University College Birmingham','Coventry University' ]
  var dates = ['1 Mar 2019','23 Apr 2019','30 Apr 2019','9 May 2019','16 May 2019','24 Jun 2019','11 Jul 2019','12 Jul 2019','28 Aug 2019','13 Nov 2019']
// GLOBAL GET ROUTER.

router.post('/' + base_url + '*/select-training-provider', function (req, res) {
  if(req.body.has_training_provider=="no"){
    if(req.query.edit=="yes"){
      res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview?edit=no")
    }else{
        res.redirect(301, '/' + base_url + req.params[0]+"/positions")
    }


  }else{
    req.session.data.trainingProvider = req.body.trainingProvider
    res.redirect(301, '/' + base_url + req.params[0]+"/confirm-training-provider")
  }

})

router.post('/' + base_url + '*/vacancy-preview', function (req, res) {
  if(req.session.data.has_training_provider=="no"){

    res.redirect(301, '/' + base_url + req.params[0]+"/confirm-provider-skip")

  }else{
    res.redirect(301, '/' + base_url + req.params[0]+"/confirmation")
  }

})

}
