module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-10'
  var base_url = 'raa-v2/' + version + '/RVDB-109-provider-move';
  var home_url = 'raa-v2/' + version + '/recruitment';

  router.post('/' + base_url + '/create-vacancy-options/title', function (req, res) {

      res.redirect(301, '/' + base_url + '/create-vacancy-options/select-training-provider')


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

  router.post('/' + base_url + '/create-vacancy-options/wage', function (req, res) {

      res.redirect(301, '/' + base_url + '/create-vacancy-options/preview-start')


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



}
