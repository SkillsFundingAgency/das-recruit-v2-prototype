module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var Fuse = require('fuse.js');
  var version = '0-1-11'
  var base_url = 'raa-v2/' + version + '/RVDB-37-saved-apprentice';
  var home_url = 'raa-v2/' + version + '/recruitment';
  var providers = ['Eurosource Solutions Limited','SBC TRAINING','learndirect Apprenticeships','Lifetime Training','Lifetime Training','University College Birmingham','Coventry University' ]
  var dates = ['1 Mar 2019','23 Apr 2019','30 Apr 2019','9 May 2019','16 May 2019','24 Jun 2019','11 Jul 2019','12 Jul 2019','28 Aug 2019','13 Nov 2019']

  function getEmployersList($employers,$amount){
    var newEmployersList = []
    var rand
    for(var i=0;i<$amount;i++){
      var rand = $employers[Math.floor(Math.random() * $employers.length)];
      newEmployersList.push(rand)
    }
    return newEmployersList
  }
  function makeCurrancyValue(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }
  function getMinWage($data){
    return Math.round(($data.weeklyHours * 52)*$data.nationalMinWage)
  }
  function isUnderMinWage($data){
    var minWage = getMinWage($data)
    if($data.WageType == "fixedWage" && parseInt($data.FixedWageYearlyAmount) < minWage){
      return true
    }
    return false


  }

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
  router.post('/' + base_url + '*/config', function (req, res) {
    req.session.data.providerName = req.session.data.orgName
    req.session.data.employers_list = getEmployersList(req.session.data.employers,req.session.data.employerAmount)
    if(req.body.journey == "new"){
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-none')
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-multiple')
    }

  })
  // -------------------------------
  // #Posting Journey
  // -------------------------------
  //NEW JOURNEY TRAINING SELECT
  router.post('/' + base_url + '*/create/training-first-select', function (req, res) {
    if (req.body.has_training == "no"){
      res.redirect(301, '/' + base_url +  req.params[0]+ '/create/training-help')
    }
      res.redirect(301, '/' + base_url +  req.params[0]+ '/create/training-confirm')


  })

  router.post('/' + base_url + '*/create/training-select', function (req, res) {
    if(req.body.training_level=="different" ){
      console.log("workning")

      req.body.training_level = req.body.training_level_new
      req.session.data.training_level = req.body.training_level_new
      console.log(req.body.training_level)
    }
      res.redirect(301, '/' + base_url +  req.params[0]+ '/create/training-confirm')
  })

  router.post('/' + base_url + '*/create/training-confirm', function (req, res) {
      res.redirect(301, '/' + base_url +  req.params[0] + '/create/select-training-provider')
  })

  router.post('/' + base_url + '*/create/title', function (req, res) {
      if(req.session.data.has_training_provider == "no" && req.session.data.return=="saved" ){
        res.redirect(301, '/' + base_url +  req.params[0] + '/create/select-training-provider')
      }else if(req.session.data.return=="saved" ){
        res.redirect(301, '/' + base_url +  req.params[0] + '/create/positions')
      }else if(req.session.data.journey=="new" ){
        res.redirect(301, '/' + base_url +  req.params[0] + '/create/training-first-select')
      }
      res.redirect(301, '/' + base_url +  req.params[0] + '/create/training-select')
  })

  router.post('/' + base_url + '*/select-training-provider*', function (req, res) {
    var index = req.body.providerName.indexOf("100")
    var ukprn =  "10003280"
    var name = "Lifestyle College Training"
    if(index > -1){
      ukprn = req.body.providerName.slice(index,req.body.providerName.length)
    }

    if(/[a-zA-Z]/.test(req.body.providerName.slice(0,index)) ){
      console.log("setting name : "+req.body.providerName.slice(0,index))
      name = req.body.providerName.slice(0,index)


    }else{
        console.log("not setting name")
    }
    req.session.data.providerName == req.body.providerName.slice(0,index)
    if(req.query.edit=="yes" && req.body.has_training_provider == "no"){
      res.redirect(301, '/' + base_url +  req.params[0]+"/vacancy-preview?edit=no")

    }
    if(req.body.has_training_provider == "yes"){
      res.redirect(301, '/' + base_url + req.params[0]+"/confirm-training-provider?providerName="+name+"&UKPRN="+ukprn)

    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/positions?providerName=")

    }

  })
  router.post('/' + base_url + '*/create/display-employer', function (req, res) {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/location')
  })
  //WAGES
  router.get('/' + base_url + '*/create/wages', function (req, res) {
    // create a new array if no array exists.
    var hasError = false;
    var errorType = "none"

    if(req.session.data.WageType == "fixedWage"){
        hasError = isUnderMinWage(req.session.data)
        errorType = "wages"
    }
    console.log("inWage="+getMinWage(req.session.data))
    console.log("WageType="+req.session.data.WageType)
    console.log("nat min wage="+req.session.data.nationalMinWage)
    res.render(base_url + req.params[0] + "/create/wages",{
      "minWage": makeCurrancyValue(getMinWage(req.session.data))
    })
  })
  router.post('/' + base_url + '*/create/wages', function (req, res) {
    console.log("working")
    var minWage = getMinWage(req.session.data)
    if(req.session.data.WageType == "nationalMinWage"){
      req.session.data.yearlyWage = "£8,736 - £16,286.40"
    }else if(req.session.data.WageType == "nationalMinApprenticeWage"){
    }else{
      var amount = parseFloat(req.session.data.yearlyWage).toLocaleString('en')
      req.session.data.yearlyWage = "£"+makeCurrancyValue(req.body.FixedWageYearlyAmount)
      console.log(req.body.FixedWageYearlyAmount)
      console.log(minWage)
      if(parseInt(req.body.FixedWageYearlyAmount) < minWage ){
        res.redirect(301, '/' + base_url + req.params[0] + "/create/wages?error=wages");

      }
    }
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + "/create/preview-start");
    }


  })
  router.post('/' + base_url + '*/create/duration', function (req, res) {
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + "/create/wages");
    }
  })
  router.post('/' + base_url + '*/create/training', function (req, res) {
    console.log(req.session.data.start_month )
    console.log(typeof parseInt(req.session.data.start_month) )
        console.log(req.session.data.start_year )

    if(parseInt(req.session.data.start_month) > 3 && parseInt(req.session.data.start_year) >2019 ){
      req.session.data.nationalMinWage = 4
    }
    console.log("changing the minWage = "+req.session.data.nationalMinWage)
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + "/create-vacancy-options/working_hours");
    }
  })

  router.post('/' + base_url + '*/create/preview-start', function (req, res) {

      res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview')
  })


  router.get('/' + base_url + '*/create/vacancy-preview', function (req, res) {

    // SET default if not set
    req.session.data.closing_month = req.session.data.closing_month || "01"

    // create a new array if no array exists.
    var hasError = false;
    var errorType = "none"

    if(req.session.data.WageType == "fixedWage"){
        hasError = isUnderMinWage(req.session.data)
        errorType = "wages"
    }
    console.log("inWage="+getMinWage(req.session.data))
    console.log("WageType="+req.session.data.WageType)
    console.log("nat min wage="+req.session.data.nationalMinWage)
    res.render(base_url + req.params[0] + "/create/vacancy-preview",{
      "hasError" : hasError,
      "errorType" : errorType,
      "minWage": makeCurrancyValue(getMinWage(req.session.data))
    })
  })

  router.post('/' + base_url + '*/create/long-description', function (req, res) {
    res.redirect(301, '/'   + base_url + req.params[0]+"/create/vacancy-preview?edit=no")

  })
  router.post('/' + base_url + '*/create/vacancy-preview', function (req, res) {
    res.redirect(301, '/'   + base_url + req.params[0]+"/create/confirmation")

  })
  router.get('/' + base_url + '/create/qualifications', function (req, res) {
    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];


    res.render(base_url + "/create/qualifications")
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

    res.redirect(301, '/' + base_url + "/create/qualifications-list");

  })
  router.get('/' + base_url + '/create/qualifications-list', function (req, res) {
    console.log("** POST|** ")
    console.log('Length '+req.session.data.qualifications.length)

    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];
    var page = "/create/qualifications-list"
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
     page = "/create/qualifications"
    }
    console.log("show alert 3= "+req.session.data.showQualificationAlert )

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
  router.post('/' + base_url + '/create/qualifications-list', function (req, res) {
    if(req.body.button == "Preview"){
      res.redirect(301, '/' + base_url + "/create/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create/qualifications-list");

    }
  })
  router.post('/' + base_url + '*/positions', function (req, res) {
    // if(req.session.data.user=="employer" && req.session.data.journey == "new"){
    //   res.redirect(301, '/' + base_url + req.params[0]+"/training-question")
    // }else if(req.session.data.numberOfPositions > 2){
    //   res.redirect(301, '/' + base_url + req.params[0]+"/training-level-new")
    // }


    if(req.session.data.NumberOfEntities > 1){
      res.redirect(301, '/'   + base_url + req.params[0]+"/employer")
    }else{
  res.redirect(301, '/'   + base_url + req.params[0]+"/display-name")

    }


  })


}
