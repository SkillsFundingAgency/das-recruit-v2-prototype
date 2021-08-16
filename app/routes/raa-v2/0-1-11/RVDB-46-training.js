module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-11'
  var base_url = 'raa-v2/' + version + '/RVDB-46-training';
  var home_url = 'raa-v2/' + version + '/recruitment';

  function findTrainingByName($data,$name){
    return $data.find( o => o.name === $name );


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

  router.post('/' + base_url + '/create-vacancy-options/title', function (req, res) {

      if(req.session.data.journey=="new"){
        res.redirect(301, '/' + base_url + '/create-vacancy-options/training-first-select?change=no')
      }
      res.redirect(301, '/' + base_url + '/create-vacancy-options/training-select?change=no')


  })

  router.post('/' + base_url + '/create-vacancy-options/training-select', function (req, res) {
      req.session.data.expiryDate = ""
      if(findTrainingByName(req.session.data.training_full,req.body.training_level)){
        req.session.data.expiryDate = findTrainingByName(req.session.data.training_full,req.body.training_level).expiryDate
      }

      res.redirect(301, '/' + base_url + '/create-vacancy-options/training-confirm')


  })
  router.post('/' + base_url + '/create-vacancy-options/training-confirm', function (req, res) {
      if(req.session.data.edit == "yes"){
          res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview')
      }else{
          res.redirect(301, '/' + base_url + '/create-vacancy-options/select-training-provider')
      }

  })

  router.post('/' + base_url + '/create-vacancy-options/training-first-select', function (req, res) {

    if (req.body.has_training == "no"){
      res.redirect(301, '/' + base_url + '/create-vacancy-options/training-help?change=no')
    }

      res.redirect(301, '/' + base_url + '/create-vacancy-options/training-select?change=no')


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
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no")

    }
    if(req.body.has_training_provider == "yes"){
      res.redirect(301, '/' + base_url + req.params[0]+"/confirm-training-provider?providerName="+name+"&UKPRN="+ukprn)

    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/positions?providerName=")

    }

  })
  router.post('/' + base_url + '/create-vacancy-options/confirm-training-provider', function (req, res) {
    if(req.session.data.edit=="yes"){

      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview")
    }
    res.redirect(301, '/' + base_url + "/create-vacancy-options/positions")
  })


  router.post('/' + base_url + '/create-vacancy-options/positions', function (req, res) {

      res.redirect(301, '/' + base_url + '/create-vacancy-options/employer')


  })
  router.post('/' + base_url + '/create-vacancy-options/employer', function (req, res) {

      res.redirect(301, '/' + base_url + '/create-vacancy-options/display-employer')


  })
  router.post('/' + base_url + '/create-vacancy-options/display-employer', function (req, res) {

      res.redirect(301, '/' + base_url + '/create-vacancy-options/location')


  })


  router.post('/' + base_url + '/create-vacancy-options/wage', function (req, res) {

      res.redirect(301, '/' + base_url + '/create-vacancy-options/preview-start')


  })
  router.get('/' + base_url + '/create-vacancy-options/training', function (req, res) {
    // create a new array if no array exists.
    var hasError = false;
    var errorType = "none"
    if(parseInt(req.session.data.start_year) >= 2019 ){
      if(parseInt(req.session.data.start_month) >= 8 && req.session.data.expiryDate){
        hasError = true
        errorType = "dates"
      }
    }
    res.render(base_url + "/create-vacancy-options/training",{
      "hasError" :hasError,
      "errorType" : errorType
    })
  })

  router.post('/' + base_url + '/create-vacancy-options/training', function (req, res) {
    console.log(req.session.data.start_month )
    console.log(typeof parseInt(req.session.data.start_month) )
    console.log(req.session.data.start_year )

    if(parseInt(req.session.data.start_month) > 3 && parseInt(req.session.data.start_year) >2019 ){
      req.session.data.nationalMinWage = 4
    }

    if(parseInt(req.body.start_year) >= 2019 ){
      if(parseInt(req.session.data.start_month) >= 8 && req.session.data.expiryDate){
        res.redirect(301, '/' + base_url + "/create-vacancy-options/training?hasError=yes&errorType=dates");
      }
    }
    console.log("changing the minWage = "+req.session.data.nationalMinWage)
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/working_hours");
    }
  })
  router.post('/' + base_url + '/create-vacancy-options/wages', function (req, res) {
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
    if(req.session.data.edit=="yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/create-vacancy-options/wages");
    }
  })

  router.post('/' + base_url + '/vacancy-preview/short-description', function (req, res) {
      res.redirect(301, '/' + base_url + '/vacancy-preview/vacancy-preview?edit=no')
  })

  // router.get('/' + base_url + '/vacancy-preview/question-list', function (req, res) {
  //   // create a new array if no array exists.
  //   req.session.data.question_simple= "no"
  //   req.session.data.qualifications = req.session.data.qualifications || [];
  //
  //   if(req.query.remove=="yes"){
  //     req.session.data.showQuestionAlert = "yes"
  //     removeFromList(req.session.data.questions,req.query.removeID);
  //   }
  //   res.render(base_url + "/vacancy-preview/question-list")
  // })

  router.get('/' + base_url + '/vacancy-preview/vacancy-preview*', function (req, res) {
    // create a new array if no array exists.
    var hasError = false;
    var errorType = "none"

    if(req.session.data.WageType == "fixedWage"){
        hasError = isUnderMinWage(req.session.data)
        errorType = "wages"
    }
    if(parseInt(req.session.data.start_year) >= 2019 ){
        if(parseInt(req.session.data.start_month) >= 8 && req.session.data.expiryDate){
      hasError = "yes"
      errorType = "dates"
    }
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
