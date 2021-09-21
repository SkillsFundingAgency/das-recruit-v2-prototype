module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var Fuse = require('fuse.js');
  var version = '0-1-11'
  var base_url = 'raa-v2/' + version + '/RVDB-139-gcse-grades-check';
  var home_url = 'raa-v2/' + version + '/recruitment';

  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  router.get('/' + base_url + '/create/qualifications', function (req, res) {
    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];


    res.render(base_url + "/create/qualifications")
  })
  router.post('/' + base_url + '/create/qualifications', function (req, res) {

    req.session.data.qualifications = req.session.data.qualifications || [];
    var qualification = {
      'ID':       req.session.data.qualifications.length,
      'type' :    req.body.QualificationType || "GCSE or equivalent",
      'subject':  req.body.Subject || "English",
      'grade' :   req.body.Grade || "5 or above",
      'weight' :  req.body.Weighting || "Essential"
    }
    req.session.data.qualifications.push(qualification);
    console.log(req.body.QualificationType)
    console.log(hasNumber(req.body.Grade))
    if(req.body.QualificationType == "GCSE or equivalent" && !hasNumber(req.body.Grade)){
      res.redirect(301, '/' + base_url + "/create/qualifications?hasError=yes&errorType=grades");
    }
    res.redirect(301, '/' + base_url + "/create/qualifications-list");

  })
  router.get('/' + base_url + '/create/qualifications-list', function (req, res) {

    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];
    var page = "/create/qualifications-list"
    req.session.data.showQualificationAlert = "no";
    // create a new array if no array exists.
    if(req.query.removeID){

      req.session.data.showQualificationAlert = "yes"
      removeFromList(req.session.data.qualifications,req.query.removeID);

    }else{
    }
    if(req.session.data.qualifications.length == 0){
      req.session.data.showQualificationAlert = "no";
     // return res.redirect(301, '/' + base_url + "/vacancy-preview/qualifications?edit=yes&qualifications=");
     page = "/create/qualifications"
    }

    res.render(base_url + page,{
      "query": req.query
    })
  })
  router.get('/' + base_url + '/create/qualifications-list-referred', function (req, res) {
    console.log(req.session.data.qualifications)
    res.render(base_url + "/vacancy-preview/qualifications-list-referred",{
      "query": req.query
    })
  })



}
