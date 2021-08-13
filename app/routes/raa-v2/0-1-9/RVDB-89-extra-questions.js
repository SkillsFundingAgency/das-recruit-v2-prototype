module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-9'
  var base_url = 'raa-v2/' + version + '/RVDB-89-extra-questions';
  var home_url = 'raa-v2/' + version + '/recruitment';

  function removeFromList(array,value){
    for (var i=0; i < array.length; i++) {

        if (array[i].ID == value) {
            array.splice(i,i+1);
            return true;
        }
    }
    return false;
  }
  router.get('/' + base_url + '/vacancy-preview/questions', function (req, res) {
    // create a new array if no array exists.
    req.session.data.questions = req.session.data.questions || [{"ID":0}];
    req.session.data.questionCount = req.session.data.questionCount || 0
    req.session.data.question_simple= "no"
    if(req.query.add=="yes"){
      var question = {
        "ID": req.session.data.questionCount,
      }
      req.session.data.questions.push(question)
      req.session.data.questionCount += 1
    }
    if(req.query.remove=="yes"){
      req.session.data.showQuestionAlert = "yes"
      removeFromList(req.session.data.questions,req.query.removeID);
    }
    res.render(base_url + "/vacancy-preview/questions")
  })

  router.get('/' + base_url + '/vacancy-preview/question-list', function (req, res) {
    // create a new array if no array exists.
    req.session.data.question_simple= "no"
    req.session.data.qualifications = req.session.data.qualifications || [];

    if(req.query.remove=="yes"){
      req.session.data.showQuestionAlert = "yes"
      removeFromList(req.session.data.questions,req.query.removeID);
    }
    res.render(base_url + "/vacancy-preview/question-list")
  })
  router.post('/' + base_url + '/vacancy-preview/question-list', function (req, res) {
    // create new array if none exists
    req.session.data.question_simple= "no"
    req.session.data.questions = req.session.data.questions || []

    if(req.body.button == "Save and continue"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }else{
        res.redirect(301, '/' + base_url + "/vacancy-preview/question-add")
    }


  })
  router.post('/' + base_url + '/vacancy-preview/application-process', function (req, res) {
    // create new array if none exists
    req.session.data.questions = req.session.data.questions || []
    if(req.session.data.question_simple == "yes"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview-simple?edit=no");
    }else{
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no");
    }


  })
  router.post('/' + base_url + '/vacancy-preview/question-simple', function (req, res) {
    // create new array
    req.session.data.question_simple= "yes"
    req.session.data.questions = []
    var question1 = req.body.question1 || "What are your strengths and weaknesses";
    req.session.data.questions.push(question1)
    if(req.body.question2){
        req.session.data.questions.push(req.body.question2)
    }
    res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview-simple?edit=no");


  })
  router.post('/' + base_url + '/vacancy-preview/question-add', function (req, res) {
    req.session.data.questions = req.session.data.questions || []
    req.session.data.question_simple= "no"
    var question = {
      "ID": req.session.data.questions.length,
      "question": req.body.question || "What is you top strength?"
    }
    req.session.data.questions.push(question);
    res.redirect(301, '/' + base_url + "/vacancy-preview/question-list?added=true")
  })


}
