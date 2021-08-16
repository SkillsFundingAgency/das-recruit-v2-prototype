module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-11'
  var base_url = 'raa-v2/' + version + '/RVDB-52-wages';
  var home_url = 'raa-v2/' + version + '/recruitment';

  // router.get('/' + base_url + '/vacancy-preview/qualifications', function (req, res) {
  //   // create a new array if no array exists.
  //   req.session.data.qualifications = req.session.data.qualifications || [];
  //
  //
  //   res.render(base_url + "/vacancy-preview/qualifications")
  // })
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
  router.post('/' + base_url + '/create-vacancy-options/title', function (req, res) {
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/positions");
    }
  })
  router.post('/' + base_url + '/create-vacancy-options/positions', function (req, res) {
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/employer");
    }
  })
  router.post('/' + base_url + '/create-vacancy-options/employer', function (req, res) {
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/display-employer");
    }
  })
  router.post('/' + base_url + '/create-vacancy-options/display-employer', function (req, res) {
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/location");
    }
  })
  router.get('/' + base_url + '/create-vacancy-options/wages', function (req, res) {
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
    res.render(base_url + "/create-vacancy-options/wages",{
      "minWage": makeCurrancyValue(getMinWage(req.session.data))
    })
  })
  router.post('/' + base_url + '/create-vacancy-options/wages', function (req, res) {
    req.session.data.weeklyHours =   req.session.data.weeklyHours = 37
    var minWage = getMinWage(req.session.data)
    if(req.session.data.WageType == "nationalMinWage"){
      req.session.data.yearlyWage = "£8,736 - £16,286.40"
    }else if(req.session.data.WageType == "nationalMinApprenticeWage"){
    }else{
      var amount = parseFloat(req.session.data.yearlyWage).toLocaleString('en')
      req.session.data.yearlyWage = "£"+makeCurrancyValue(req.body.FixedWageYearlyAmount)
      console.log(req.body.FixedWageYearlyAmount)
      if(parseInt(req.body.FixedWageYearlyAmount) < minWage ){
        res.redirect(301, '/' + base_url + "/create-vacancy-options/wages?error=wages");

      }
    }
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/preview-start");
    }


  })
  router.post('/' + base_url + '/create-vacancy-options/working_hours', function (req, res) {
    if(!req.body.weeklyHours){
      req.session.data.weeklyHours == 37
    }
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/wages");
    }
  })
  router.post('/' + base_url + '/create-vacancy-options/training', function (req, res) {
    console.log(req.session.data.start_month )
    console.log(typeof parseInt(req.session.data.start_month) )
        console.log(req.session.data.start_year )

    if(parseInt(req.session.data.start_month) > 3 && parseInt(req.session.data.start_year) >2019 ){
      req.session.data.nationalMinWage = 4
    }
    console.log("changing the minWage = "+req.session.data.nationalMinWage)
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/working_hours");
    }
  })
  router.get('/' + base_url + '/vacancy-preview/vacancy-preview*', function (req, res) {
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
    res.render(base_url + "/vacancy-preview/vacancy-preview"+req.params[0],{
      "hasError" : hasError,
      "errorType" : errorType,
      "minWage": makeCurrancyValue(getMinWage(req.session.data))
    })
  })



}
