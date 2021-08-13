module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-9'
  var base_url = 'raa-v2/' + version + '/RVDB-55-disabilty-confident';
  var home_url = 'raa-v2/' + version + '/recruitment';

  router.get('/' + base_url + '/create-vacancy-options/disability_set', function (req, res,next) {
    //reset the disibility confiendnt setting if createing a new one.
    return res.redirect(301, '/' + base_url + "/create-vacancy-options/disability");

  })


  router.post('/' + base_url + '/create-vacancy-options/location', function (req, res) {
    //reset the disibility confiendnt setting if createing a new one.
    if(req.query.edit != "yes"){
      req.session.data.disability_confident_signed = "no";
      req.session.data.disability_confident_level = "";
    }
    res.redirect(301, '/' + base_url + "/create-vacancy-options/disability");

  })
  router.post('/' + base_url + '/create-vacancy-options/disability*', function (req, res) {
    if(req.body.disability_confident_signed == "no"){
      // clear level if no is selected
    }else{
      req.session.data.disability_confident_show = "yes"
    }
    if(req.query.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview")
    }
      res.redirect(301, '/' + base_url + "/create-vacancy-options/training")

  })


}
