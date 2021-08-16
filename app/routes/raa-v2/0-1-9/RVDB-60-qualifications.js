module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-9'
  var base_url = 'raa-v2/' + version + '/RVDB-60-qualifications';
  var home_url = 'raa-v2/' + version + '/recruitment';

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  function removeFromList(array,value){
    for (var i=0; i < array.length; i++) {

        if (array[i].ID == value) {
            array.splice(i,i+1);
            return true;
        }
    }
    return false;
  }

  router.get('/' + base_url + '/vacancy-preview/qualifications', function (req, res) {
    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];


    res.render(base_url + "/vacancy-preview/qualifications")
  })
  router.post('/' + base_url + '/vacancy-preview/qualifications', function (req, res) {
    req.session.data.qualifications = req.session.data.qualifications || [];
    var qualification = {
      'ID':       req.session.data.qualifications.length,
      'type' :    req.body.QualificationType || "GCSE or equivalent",
      'subject':  req.body.Subject || "English",
      'grade' :   req.body.Grade || "C or above",
      'weight' :  req.body.Weighting || "Essential"
    }
    req.session.data.qualifications.push(qualification);

    res.redirect(301, '/' + base_url + "/vacancy-preview/qualifications-list");

  })
  router.get('/' + base_url + '/vacancy-preview/qualifications-list', function (req, res) {
    console.log("** POST|** ")
    console.log('Length '+req.session.data.qualifications.length)

    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];
    var page = "/vacancy-preview/qualifications-list"
    req.session.data.showQualificationAlert = "no";
    console.log("show alert 0= "+req.session.data.showQualificationAlert )
    // create a new array if no array exists.
    if(req.query.removeID){
      console.log("REMOVING")

      req.session.data.showQualificationAlert = "yes"
      removeFromList(req.session.data.qualifications,req.query.removeID);
      console.log("show alert 1= "+req.session.data.showQualificationAlert )

    }else{
      console.log("ADDING")
    }
    console.log("Length again: "+req.session.data.qualifications.length)
    console.log("show alert 2= "+req.session.data.showQualificationAlert )
    console.log("")
    if(req.session.data.qualifications.length == 0){
      req.session.data.showQualificationAlert = "no";
     // return res.redirect(301, '/' + base_url + "/vacancy-preview/qualifications?edit=yes&qualifications=");
     page = "/vacancy-preview/qualifications"
    }
    console.log("show alert 3= "+req.session.data.showQualificationAlert )

    res.render(base_url + page,{
      "query": req.query
    })
  })
  router.get('/' + base_url + '/vacancy-preview/qualifications-list-referred', function (req, res) {
    console.log(req.session.data.qualifications)
    res.render(base_url + "/vacancy-preview/qualifications-list-referred",{
      "query": req.query
    })
  })
  router.post('/' + base_url + '/vacancy-preview/qualifications-list', function (req, res) {
    if(req.body.button == "Preview"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/vacancy-preview/qualifications-list");

    }
  })



}
