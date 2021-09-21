module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var Fuse = require('fuse.js');
  var version = '0-1-10'
  var base_url = 'raa-v2/' + version + '/RVDB-110-improved-preview';
  var home_url = 'raa-v2/' + version + '/recruitment';
  var providers = ['Eurosource Solutions Limited','SBC TRAINING','learndirect Apprenticeships','Lifetime Training','Lifetime Training','University College Birmingham','Coventry University' ]
  var dates = ['1 Mar 2019','23 Apr 2019','30 Apr 2019','9 May 2019','16 May 2019','24 Jun 2019','11 Jul 2019','12 Jul 2019','28 Aug 2019','13 Nov 2019']
// GLOBAL GET ROUTER.
function getEmployersList($employers,$amount){
  var newEmployersList = []
  var rand
  for(var i=0;i<$amount;i++){
    var rand = $employers[Math.floor(Math.random() * $employers.length)];
    newEmployersList.push(rand)
  }
  return newEmployersList
}

function getTrainingList($query,$data){
   var list = []
   $query.replace(/[()]/g, '');

   var queryarray = $query.split(" ");
   for(var i = 0; i<$data.length; i++){

     for (var j = 0; j<queryarray.length; j++){
       if($data[i].name.indexOf(queryarray[j]) > -1) {
         list.push($data[i])
       }
     }
   }
   return list
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

  // -------------------------------
  // #config
  // -------------------------------
  router.post('/' + base_url + '*/config', function (req, res) {
    req.session.data.providerName = req.session.data.orgName
    req.session.data.employers_list = getEmployersList(req.session.data.employers,req.session.data.employerAmount)
    if(req.session.data.journey == "new"){
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-none')
    }
    if(req.session.data.user == "employer"){
      res.redirect(301, '/' + base_url + req.params[0] + '/vacancies')
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard')
    }

  })
  router.get('/' + base_url + '*/vacancies', function (req, res) {
    var query = req.query.search
    if (query){
      if(req.query.search.indexOf('(') > -1){
        query = req.query.search.slice(0,req.query.search.indexOf('(')-1)
      }
    }
    res.render(base_url + req.params[0]+ '/vacancies', {
      "search" : query,

      }
    )
  })
  router.post('/' + base_url + '*/create-vacancy', function (req, res) {
    if(req.session.data.create_option!="new"){
      res.redirect(301, '/' + base_url + req.params[0] +'/clone-vacancy')
    }else{
      res.redirect(301, '/' + base_url + req.params[0] +'/title')

    }

  })
  // title
  router.post('/' + base_url + '*/title', function (req, res) {
    if(req.session.data.user=="employer"){
      res.redirect(301, '/' + base_url + req.params[0]+"/select-training-provider")
    }
    res.redirect(301, '/'   + base_url + req.params[0]+"/positions")
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
  router.get('/' + base_url + '*/training', function (req, res) {
    var query = (req.query.query && req.query.query!="all") ? req.query.query : 'all';
    var options = {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 200,
        maxPatternLength: 80,
        minMatchCharLength: 3,
        keys: [
          "name"
        ]
      };


    if(query != "all"){
      var fuse = new Fuse(req.session.data.training_full, options); // "list" is the item array
      var result = fuse.search(query);
    }else{
      var result = req.session.data.training_full
    }


    res.render(base_url + req.params[0]+ '/training', {
      "list" : result,
      "search" : query
      }
    )
  })
  router.post('/' + base_url + '*/training-question', function (req, res) {
    if(req.session.data.hasTrainingProvider=="yes"){
      res.redirect(301, '/' + base_url + req.params[0]+"/training-level")
    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/training-help")
    }
  })
  router.post('/' + base_url + '*/training-level*', function (req, res) {
    res.redirect(301, '/' + base_url + req.params[0]+"/training-results")
  })
  router.post('/' + base_url + '*/select-training-provider', function (req, res) {
    if(req.body.has_training_provider=="no"){
      res.redirect(301, '/' + base_url + req.params[0]+"/positions")

    }else{
      req.session.data.trainingProvider = req.body.trainingProvider
      res.redirect(301, '/' + base_url + req.params[0]+"/confirm-training-provider")
    }

  })
  router.post('/' + base_url + '*/employer', function (req, res) {
    if(req.session.data.journey == "employer"){
      res.redirect(301, '/'   + base_url + req.params[0]+"/display-name")
    }else{
      res.redirect(301, '/'   + base_url + req.params[0]+"/location")
    }


  })

  router.post('/' + base_url + '*/location', function (req, res) {
    if(req.session.data.journey == "employer"){
      res.redirect(301, '/' + base_url + req.params[0]+"/employer-check")

    }else if(req.session.data.journey == "new"){
      res.redirect(301, '/' + base_url + req.params[0]+"/about-employer")
    }else if(req.session.data.is_disability_confident == "yes"){
      res.redirect(301, '/' + base_url + req.params[0]+"/dates")
    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/disability")
    }

  })
  router.post('/' + base_url + '*/disability', function (req, res) {
    // if(req.body.disability_confident_signed=='yes'){
    //
    // }
    if(req.session.data.edit == "yes"){
      res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")
    }else{
      res.redirect(301, '/'   + base_url + req.params[0]+"/dates?edit=no")
    }
  })
  router.post('/' + base_url + '*/disability-vacancy-check', function (req, res) {
    req.session.data.is_disability_confident = (req.body.disability_confident_level) ? "yes" : "no"
    res.redirect(301, '/' + base_url + '/create/long-description')
  })

  router.post('/' + base_url + '*/dates', function (req, res) {
    console.log(req.body)
    if(req.session.data.edit == "yes"){
      res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")
    }else{
      res.redirect(301, '/'   + base_url + req.params[0]+"/duration?edit=no")
    }


  })
  router.post('/' + base_url + '*/duration', function (req, res) {
    if(req.session.data.edit == "yes"){
      res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")
    }else{
      res.redirect(301, '/'   + base_url + req.params[0]+"/wages?edit=no")
    }


  })
  router.post('/' + base_url + '*/long-description', function (req, res) {
    console.log("knickers")
    if(req.session.data.edit == "yes"){
      res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")
    }else{
      res.redirect(301, '/'   + base_url + req.params[0]+"/short-description?edit=no")
    }


  })
  router.post('/' + base_url + '*/wages', function (req, res) {
    console.log("knickers")
    if(req.session.data.edit == "yes"){
      res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")
    }else{
      res.redirect(301, '/'   + base_url + req.params[0]+"/long-description?edit=no")
    }


  })
  router.post('/' + base_url + '*/skills', function (req, res) {
    console.log(req.body)
    if(req.session.data.edit == "yes"){
      res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")
    }else{
      res.redirect(301, '/'   + base_url + req.params[0]+"/qualifications?edit=no")
    }


  })

  router.post('/' + base_url + '/create/short-description', function (req, res) {
    console.log("short description")
    req.session.shortDescription = req.body.shortDescription || "As a Software Developer Apprentice, you will be undertaking a recognised apprenticeship qualification, including Microsoft certifications, at the same time as working as part of the company’s Software Development team."
    if(req.body.continueButton){
      res.redirect(301, '/' + base_url + '/create/skills')
    }else{
      res.redirect(301, '/' + base_url + '/create/vacancy-preview')
    }
  })
  router.post('/' + base_url + '*/employer-check', function (req, res) {
    // create a new array if no array exists.
    req.session.data.EmployerWebsiteUrl = req.session.data.EmployerWebsiteUrl || "https://www.companyname.com"
    req.session.data.EmployerWebsiteUrl = req.session.data.EmployerWebsiteUrl || "https://www.companyname.com"
    req.session.data.is_disability_confident = req.session.data.is_disability_confident|| "yes"
    req.session.data.disability_confident_level = req.session.data.disability_confident_level  || "level1"
    req.session.data.EmployerContactName = req.session.data.EmployerContactName || "Richard Hatton"
    res.redirect(301, '/' + base_url + req.params[0]+"/dates");


  })

  router.get('/' + base_url + '*/qualifications', function (req, res) {
    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];


    res.render(base_url + req.params[0]+"/qualifications")
  })
  router.post('/' + base_url + '*/qualifications', function (req, res) {
    req.session.data.qualifications = req.session.data.qualifications || [];
    var qualification = {
      'ID':       req.session.data.qualifications.length,
      'type' :    req.body.QualificationType || "GCSE",
      'subject':  req.body.Subject || "English",
      'grade' :   req.body.Grade || "C or above",
      'weight' :  req.body.Weighting || "Essential"
    }
    req.session.data.qualifications.push(qualification);

    res.redirect(301, '/' + base_url + req.params[0]+"/qualifications-list");

  })
  router.get('/' + base_url + '*/qualifications-list', function (req, res) {

    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];
    var page = req.params[0]+"/qualifications-list"
    req.session.data.showQualificationAlert = "no";
    // create a new array if no array exists.
    if(req.query.removeID){

      req.session.data.showQualificationAlert = "yes"
      removeFromList(req.session.data.qualifications,req.query.removeID);

    }else{
      console.log("ADDING")
    }
    if(req.session.data.qualifications.length == 0){
      req.session.data.showQualificationAlert = "no";
     // return res.redirect(301, '/' + base_url + "*/qualifications?edit=yes&qualifications=");
     page = req.params[0]+"/qualifications"
    }
    console.log("show alert 3= "+req.session.data.showQualificationAlert )

    res.render(base_url + page,{
      "query": req.query
    })
  })
  router.post('/' + base_url + '*/qualifications-list', function (req, res) {
    console.log(req.body)
      if(req.body.button == "Preview"){
        res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview?edit=no");
      }else if(req.body.button == "Continue"){
        res.redirect(301, '/' + base_url + req.params[0]+"/application-process?edit=no");
      }else{
        res.redirect(301, '/' + base_url + req.params[0]+"/qualifications-list");

      }

  })

}
