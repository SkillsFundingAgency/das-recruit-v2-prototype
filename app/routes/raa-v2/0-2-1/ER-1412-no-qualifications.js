module.exports = function(router) {
  var tools = require('../tools.js')
  // CHANGE VERSION TO THE VERSION
  const version = '0-2-1'
  const base_url = 'raa-v2/' + version + "/ER-1412-no-qualifications"
  const file_url = 'raa-v2/' + version + "/recruitment"

  // ---------------
  // Suporting functions
  // ---------------
  function removeFromList(array, value) {
    for (var i = 0; i < array.length; i++) {

      if (array[i].ID == value) {
        array.splice(i, i + 1);
        return true;
      }
    }
    return false;
  }

  // ---------------
  // NEW
  // ---------------
  router.post('/' + base_url + '*/create/qualification-question', function(req, res) {
    if(req.body.show_qualifications == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications");
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }
  })

  // ---------------
  //UPDATED
  // ---------------
  router.post('/' + base_url + '*/create/qualifications-list', function(req, res) {
    // if the rendered page is actually the qualification-question page
    if(req.body.show_qualifications == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications");
    }else if(req.body.show_qualifications == "no"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }

    if (req.body.button == "Preview") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications-list");

    }
  })
  router.get('/' + base_url + '*/create/qualifications-list', function(req, res) {
    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];
    var page = "/create/qualifications-list"
    req.session.data.showQualificationAlert = "no";
    // create a new array if no array exists.
    if (req.query.removeID) {
      req.session.data.showQualificationAlert = "yes"
      removeFromList(req.session.data.qualifications, req.query.removeID);

    }
    if (req.session.data.qualifications.length == 0) {
      req.session.data.showQualificationAlert = "no";
      // return res.redirect(301, '/' + base_url + "/vacancy-preview/qualifications?edit=yes&qualifications=");
      page = "/create/qualification-question"
    }
    res.render(base_url + req.params[0] + page, {
      "query": req.query,
    }, function(err, html) {
      if (err) {
        return res.render(file_url + page);
        throw err;
      }
      res.send(html);
    });
  })






}
