module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-10'
  var base_url = 'raa-v2/' + version + '/RVDB-108-remove-summary';
  var home_url = 'raa-v2/' + version + '/recruitment';

  router.post('/' + base_url + '/create-vacancy-options/wage', function (req, res) {

      res.redirect(301, '/' + base_url + '/create-vacancy-options/preview-start')


  })

  router.get('/' + base_url + '/create-vacancy-options/preview-start', function (req, res) {
    res.render(base_url + "/create-vacancy-options/preview-start")
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



}
