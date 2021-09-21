  module.exports = function(router) {
  var tools = require('../tools.js')
  // CHANGE VERSION TO THE VERSION
  const version = '0-1-13'
  const base_url = 'raa-v2/' + version + "/RVDB-141-edit-qualifications"
  const file_url = 'raa-v2/' + version + "/recruitment"
  const moment = require('moment');
  const fs = require('fs')

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
    req.session.data.qualifications = req.session.data.qualifications || [];

    // create a new array if no array exists.
    if (req.query.show_defualt_qualifications){
      req.session.data.qualifications = req.session.data.default_qualifications
    }

    var page = "/create/qualifications-list"
    req.session.data.showQualificationAlert = "no";
    // create a new array if no array exists.
    if (req.query.removeID) {
      req.session.data.showQualificationAlert = "yes"
      tools.removeFromList(req.session.data.qualifications, req.query.removeID);

    } else {
      console.log("ADDING")
    }
    if (req.session.data.qualifications.length == 0) {
      req.session.data.showQualificationAlert = "no";
      // return res.redirect(301, '/' + base_url + "/vacancy-preview/qualifications?edit=yes&qualifications=");
      page = "/create/qualifications"
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
  router.post('/' + base_url + '*/create/qualifications', function(req, res) {

    req.session.data.qualifications = req.session.data.qualifications || [];

    if(req.query.edit != "yes"){
      var qualification = {
        'ID': req.session.data.qualifications.length,
        'type': req.body.QualificationType || "GCSE or equivalent",
        'subject': req.body.Subject || "English",
        'grade': req.body.Grade || "5 or above",
        'weight': req.body.Weighting || "Essential"
      }
      req.session.data.qualifications.push(qualification);
    }else{
      tools.editListItem(
        req.session.data.qualifications,
        req.query.ID,
        req.body.QualificationType ,
        req.body.Subject,
        req.body.Grade,
        req.body.Weighting);
    }

    if (req.body.QualificationType == "GCSE or equivalent" && !tools.hasNumber(req.body.Grade)) {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications?hasError=yes&errorType=grades");
    }else if(req.body.button =="Save and continue"){
        res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications-list?hasError=no");
    }
    res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications-list?hasError=no");

  })





}
