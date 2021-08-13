module.exports = function(router) {
  var tools = require('../tools.js')
  // CHANGE VERSION TO THE VERSION
  const version = '0-2-1'
  const base_url = 'raa-v2/' + version + "/testing"
  const file_url = 'raa-v2/' + version + "/recruitment"

  // ---------------
  // Suporting functions
  // ---------------
  function removeFromList(array, value) {
    for (var i = 0; i < array.length; i++) {

      if (array[i].ID == value) {
        array.splice(i, i + 1);
        return true;
      }
    }
    return false;
  }
  function checkForProfanity($copy,$list){
    var result = "no"
    $list.forEach(function(element) {
      if($copy.toLowerCase().includes(element)){
        console.log(element);

        console.log("element");
        result = "yes";
      }


    });
    return result;
  }
  function checkBannedPhrases($copy,$list){
    var result = []
    $list.forEach(function(element) {
      if($copy.toLowerCase().includes(element)){

        result.push(element)
      }


    });
    return result;
  }
  router.get('/' + base_url + ' */vacancies', function(req, res) {
    console.log("req.query.search="+req.query.search)
    res.render(base_url + req.params[0] + '/vacancies', {
      "query": req.query,
      "search": req.query.search
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/vacancies', {
            "query": req.query,
            "search": req.query.search
          });
        }
        throw err;
      }
      res.send(html);
    });

  })
  // ---------------
  // NEW
  // ---------------
  router.post('/' + base_url + '*/create/qualification-question', function(req, res) {
    if(req.body.show_qualifications == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications");
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }
  })

  // ---------------
  //UPDATED
  // ---------------
  router.post('/' + base_url + '*/create/qualifications-list', function(req, res) {
    // if the rendered page is actually the qualification-question page
    if(req.body.show_qualifications == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications");
    }else if(req.body.show_qualifications == "no"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }

    if (req.body.button == "Preview") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications-list");

    }
  })
  router.get('/' + base_url + '*/create/qualifications-list', function(req, res) {
    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];
    var page = "/create/qualifications-list"
    req.session.data.showQualificationAlert = "no";
    // create a new array if no array exists.
    if (req.query.removeID) {
      req.session.data.showQualificationAlert = "yes"
      removeFromList(req.session.data.qualifications, req.query.removeID);

    }
    if (req.session.data.qualifications.length == 0) {
      req.session.data.showQualificationAlert = "no";
      // return res.redirect(301, '/' + base_url + "/vacancy-preview/qualifications?edit=yes&qualifications=");
      page = "/create/qualification-question"
    }
    res.render(base_url + req.params[0] + page, {
      "query": req.query,
    }, function(err, html) {
      if (err) {
        return res.render(file_url + page);
        throw err;
      }
      res.send(html);
    });
  })

  router.post('/' + base_url + '*/create/long-description', function(req, res) {
    req.session.data.errorType = []
    var has_profanity_d=checkForProfanity(req.body.VacancyDescription,req.session.data.profanities)
    var has_profanity_t=checkForProfanity(req.body.TrainingQualification,req.session.data.profanities)
    var has_profanity_o=checkForProfanity(req.body.OutcomeDescription,req.session.data.profanities)

    req.session.data.bannedPhrases=checkBannedPhrases(req.body.VacancyDescription,req.session.data.bannedPhrases)

    if(has_profanity_d == 'yes'){
      req.session.data.errorType.push("VacancyDescription")
    }
    if(has_profanity_t == 'yes'){
      req.session.data.errorType.push("TrainingQualification")
    }
    if(has_profanity_o == 'yes'){
      req.session.data.errorType.push("OutcomeDescription")
    }
    console.log('has_profanity_d='+has_profanity_d)
    console.log('has_profanity_0='+has_profanity_o)
    console.log(' has_profanity_t ='+ has_profanity_t )
    if(has_profanity_d == "yes" || has_profanity_o == "yes" ||  has_profanity_t == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + '/create/long-description?hasError=yes')
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview?edit=no')
    }

  })

  router.post('/' + base_url + '*/create/vacancy-preview', function(req, res) {
    if(req.session.data.bannedPhrases.length > 0){
      res.redirect(301, '/' + base_url + req.params[0] + '/create/check-vacancy')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/confirmation')
  })

  router.post('/' + base_url + '*/create/short-description', function(req, res) {
    if(req.body.shortDescription){
      res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview-advisory?edit=no&has_advisory=yes')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview?edit=no&has_advisory=no')
  })

  router.post('/' + base_url + '*/receive-notifications', function(req, res) {
    if(req.body.receive_notification == "yes"){
      req.session.data.seen_notification_interupt="yes"
      res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notification-preferences')
    }else{
      req.session.data.seen_notification_interupt="no"
      if(req.session.data.journey=="new"){
        res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-none')
      }else{
        if(req.session.data.user=="provider"){
          res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-multiple')
        }else{
          res.redirect(301, '/' + base_url + req.params[0] + '/vacancies')
        }
      }
    }
    })



  router.post('/' + base_url + '*/create/vacancy-preview', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/create/confirmation')
  })





}
