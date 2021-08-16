module.exports = function(router) {
  var tools = require('../tools.js')



  // CHANGE VERSION TO THE VERSION
  const version = '0-1-13'
  const base_url = 'raa-v2/' + version + "/RVDB-151-profanity-check"
  const file_url = 'raa-v2/' + version + "/recruitment"
  const moment = require('moment');
  const fs = require('fs')


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

  // ---------------
  // NEW
  // ---------------

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

  // ---------------
  //UPDATED
  // ---------------

}
