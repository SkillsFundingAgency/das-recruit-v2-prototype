module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var Fuse = require('fuse.js');
  var version = '0-1-10'
  var base_url = 'raa-v2/' + version + '/RVDB-40-new-journey-split';
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
// router.post('/' + base_url + '*/positions', function (req, res) {
//   res.redirect(301, '/'   + base_url + req.params[0]+"/preview-start")
// })

router.post('/' + base_url + '*/positions', function (req, res) {
  console.log(req.session.data.NumberOfEntities)
  if(req.session.data.NumberOfEntities > 1){
    res.redirect(301, '/'   + base_url + req.params[0]+"/employer")
  }else{
res.redirect(301, '/'   + base_url + req.params[0]+"/display-name")

  }

})
router.post('/' + base_url + '*/display-name', function (req, res) {
  res.redirect(301, '/'   + base_url + req.params[0]+"/location")

})

router.post('/' + base_url + '*/dates', function (req, res) {
  console.log(req.body)
  res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")

})
router.post('/' + base_url + '*/long-description', function (req, res) {
  res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")

})
router.post('/' + base_url + '*/short-description', function (req, res) {
  res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")

})
router.post('/' + base_url + '*/things-to-consider', function (req, res) {
  res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")

})
router.post('/' + base_url + '*/wages', function (req, res) {
  res.redirect(301, '/'   + base_url + req.params[0]+"/vacancy-preview?edit=no")

})
function removeFromList(array,value){
  for (var i=0; i < array.length; i++) {

      if (array[i].ID == value) {
          array.splice(i,i+1);
          return true;
      }
  }
  return false;
}

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
  if(req.body.button == "Preview"){
    res.redirect(301, '/' + base_url + req.params[0]+"/vacancy-preview?edit=no");
  }else{
    res.redirect(301, '/' + base_url + req.params[0]+"/qualifications-list");

  }
})

router.post('/' + base_url + '*/question-simple', function (req, res) {
  // create new array
  req.session.data.question_simple= "yes"
  req.session.data.questions = []
  var question1 = req.body.question1 || "What are your strengths and weaknesses";
  req.session.data.questions.push(question1)
  if(req.body.question2){
      req.session.data.questions.push(req.body.question2)
  }
  res.redirect(301, '/' + base_url + req.params[0]+ "/vacancy-preview?edit=no");


})




}
