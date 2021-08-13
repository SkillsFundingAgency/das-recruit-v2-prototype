module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-9'
  var base_url = 'raa-v2/' + version + '/RVDB-70-title-position-split';
  var home_url = 'raa-v2/' + version + '/recruitment';


  router.post('/' + base_url + '/create-vacancy-options/title', function (req, res) {
    //reset the disibility confiendnt setting if createing a new one.
    if(req.query.edit == "yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/positions");

    }


  })
  router.post('/' + base_url + '/create-vacancy-options/positions', function (req, res) {
    req.session.data.numberOfPositions = req.body.numberOfPositions || 1
    if(req.query.edit == "yes"){
        res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
        res.redirect(301, '/' + base_url + "/create-vacancy-options/short-description")

    }

  })


}
