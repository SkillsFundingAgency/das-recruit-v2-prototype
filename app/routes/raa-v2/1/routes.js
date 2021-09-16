module.exports = function(router) {
  // Require files in this testing version
  var tools = require('../tools.js')

  require('./ER-1412-no-qualifications.js')(router)
  require('./RVDB-21-collaboration.js')(router)
  require('./testing.js')(router)



  // CHANGE VERSION TO THE VERSION
  const version = '1'
  const base_url = 'raa-v2/' + version + "/"
  const file_url = 'raa-v2/' + version + "/recruitment"
  const moment = require('moment');

  // -------------------------------
  // #config
  // -------------------------------

  // ACTION CALLED ON EVERY PAGE
  router.get('/' + base_url + '*', function(req, res, next) {
    // Track any changes to employer amount and update the the emloyers list
    if (req.session.data.currentEmployerAmount != req.session.data.employerAmount) {
      req.session.data.currentEmployerAmount = req.session.data.employerAmount
      tools.getEmployersList(req.session.data.employers, req.session.data.employerAmount)
    }
    req.session.data.currentEmloyerAmount = req.session.data.currentEmloyerAmount || req.session.data.employerAmount
    return next()
  })

  router.post('/' + base_url + '*/config', function(req, res) {
    req.session.data.providerName = req.session.data.orgName
    req.session.data.employers_list = tools.getEmployersList(req.session.data.employers, req.session.data.employerAmount)
    if (req.session.data.journey == "new") {
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-none')
    }
     else {
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard')
    }
  })

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

  // -------------------------------
  // #Posting Journey
  // -------------------------------
  //NEW JOURNEY TRAINING SELECT
  router.post('/' + base_url + '*/create/training-first-select', function(req, res) {
    if (req.body.has_training == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/training-help')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/training-confirm')

  })

  router.post('/' + base_url + '*/create/training-select', function(req, res) {
    if (req.body.training_level == "different") {
      console.log("working")

      req.body.training_level = req.body.training_level_new
      req.session.data.training_level = req.body.training_level_new
      console.log(req.body.training_level)
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/training-confirm')
  })


  router.post('/' + base_url + '*/create/training-confirm', function(req, res) {
      if (req.session.data.user=="employer"){
    res.redirect(301, '/' + base_url + req.params[0] + '/create/select-training-provider')
    console.log("emp")}
else{res.redirect(301, '/' + base_url + req.params[0] + '/create/positions')
    console.log("prov")}
  })


  router.post('/' + base_url + '*/create/title', function(req, res) {
    if (req.session.data.journey == "new") {
      res.redirect(301, '/' + base_url + req.params[0] + '/create/training-first-select')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/training-select')
  })


  router.post('/' + base_url + '*/create/select-training-provider', function(req, res) {
    var index = req.body.providerName.indexOf("100")
    var ukprn = "10003280"
    var name = "Lifestyle College Training"
    if (index > -1) {
      ukprn = req.body.providerName.slice(index, req.body.providerName.length)
    }

    if (/[a-zA-Z]/.test(req.body.providerName.slice(0, index))) {
      console.log("setting name : " + req.body.providerName.slice(0, index))
      name = req.body.providerName.slice(0, index)



    } else {
      console.log("not setting name")
    }
    req.session.data.providerName == name
    if (name == "PLUMPTON COLLEGE ") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/select-training-provider?hasError=yes&errorType=provider&has_training_provider=yes")
    } else {
      req.session.data.providerName == req.body.providerName.slice(0, index);
    }
    if (req.query.edit == "yes" && req.body.has_training_provider == "no") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no")
    }
    if (req.body.has_training_provider == "yes") {
      if (req.query.provider_blocked) {
        res.redirect(301, '/' + base_url + req.params[0] + "/create/select-training-provider?hasError=yes&errorType=provider")
      }
      res.redirect(301, '/' + base_url + req.params[0] + "/create/confirm-training-provider?hasError=no&errorType=&providerName=" + name + "&UKPRN=" + ukprn)

    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/positions?providerName=")


    }

  })
  router.post('/' + base_url + '*/create/confirm-training-provider', function(req, res) {
    if(req.session.data.edit == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview?edit=no')
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/create/positions')
  })
  router.post('/' + base_url + '*/create/positions', function(req, res) {
    if (req.session.data.NumberOfEntities > 1) {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/display-employer")
    }
    res.redirect(301, '/' + base_url + req.params[0] + "/create/display-name")

  })
  router.post('/' + base_url + '*/create/display-employer', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/create/location')
  })
  router.post('/' + base_url + '*/create/location', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/create/dates')
  })
  //WAGES
  router.get('/' + base_url + '*/create/wages', function(req, res) {

    // create a new array if no array exists.
    var hasError = false;
    var errorType = "none"
    // set default weeklyHours if not set
    req.session.data.weeklyHours == req.session.data.weeklyHours || 23
    if (req.session.data.WageType == "fixedWage") {
      hasError = tools.isUnderMinWage(req.session.data)
      errorType = "wages"
    }

    res.render(base_url + req.params[0] + "/create/wages", {
      "minWage": tools.makeCurrancyValue(tools.getMinWage(req.session.data))
    }, function(err, html) {
      if (err) {

        return res.render(file_url + "/create/wages");
        throw err;
      }
      res.send(html);
    });

  })
  router.post('/' + base_url + '*/create/wages', function(req, res) {
    var minWage = tools.getMinWage(req.session.data)
    if (req.session.data.WageType == "nationalMinWage") {
      req.session.data.yearlyWage = "£8,736 - £16,286.40"
    } else if (req.session.data.WageType == "nationalMinApprenticeWage") {} else {
      var amount = parseFloat(req.session.data.yearlyWage).toLocaleString('en')
      req.session.data.yearlyWage = "£" + tools.makeCurrancyValue(req.body.FixedWageYearlyAmount)
      if (parseInt(req.body.FixedWageYearlyAmount) < minWage) {
        res.redirect(301, '/' + base_url + req.params[0] + "/create/wages?error=wages");
      }
    }
    if (req.session.data.edit == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no&error=");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/preview-start?error=");
    }


  })
  router.post('/' + base_url + '*/create/duration', function(req, res) {
    if (req.session.data.edit == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/wages?error=");
    }
  })
  router.post('/' + base_url + '*/create/dates', function(req, res) {
    if (parseInt(req.session.data.start_month) > 3 && parseInt(req.session.data.start_year) > 2019) {
      req.session.data.nationalMinWage = 4
    }
    if (req.session.data.edit == "yes") {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/duration");
    }
  })

  router.post('/' + base_url + '*/create/preview-start', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview')
  })

  router.get('/' + base_url + '*/create/vacancy-preview*', function(req, res) {

    // SET default if not set
    req.session.data.closing_month = req.session.data.closing_month || "01"
    req.session.data.weeklyHours == req.session.data.weeklyHours || 23

    var hasError = false;
    var errorType = "none"
    //var mWage = tools.getMinWage(req.session.data)
    var mWage = '4000'

    if (req.session.data.WageType == "fixedWage") {
      hasError = tools.isUnderMinWage(req.session.data)
      errorType = "wages"
    }

    res.render(base_url + req.params[0] + "/create/vacancy-preview" + req.params[1], {
      "hasError": hasError,
      "errorType": errorType,
      "minWage": tools.makeCurrancyValue(mWage)
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + "/create/vacancy-preview" + req.params[1]);
        }
        throw err;
      }
      res.send(html);
    })
  })
  router.post('/' + base_url + '*/create/vacancy-preview', function(req, res) {
    //Ricky to do
    //If press delete show delete screen
    //If submit go to confirmation
    //res.redirect(301, '/' + base_url + req.params[0] + '/create/deleteRICKY')
    res.redirect(301, '/' + base_url + req.params[0] + '/create/confirmation')
    //Ricky
  })
  router.post('/' + base_url + '*/create/long-description', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no")

  })
  router.get('/' + base_url + '*/create/qualifications', function(req, res) {
    // create a new array if no array exists.
    req.session.data.qualifications = req.session.data.qualifications || [];

    res.render(base_url + req.params[0] + '/create/qualifications', {
      "query": req.query,
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/create/qualifications');
        }
        throw err;
      }
      res.send(html);
    });

  })
  router.post('/' + base_url + '*/create/qualification-question', function(req, res) {
    if(req.body.show_qualifications == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications");
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
    }
  })
  router.post('/' + base_url + '*/create/qualifications', function(req, res) {

    req.session.data.qualifications = req.session.data.qualifications || [];

    if(req.query.edit != "yes"){
      var qualification = {
        'ID': req.session.data.qualifications.length,
        'type': req.body.QualificationType || "GCSE or equivalent",
        'subject': req.body.Subject || "English",
        'grade': req.body.Grade || "5 or above",
        'weight': req.body.Weighting || "Essential"
      }
      req.session.data.qualifications.push(qualification);
    }else{
      tools.editListItem(
        req.session.data.qualifications,
        req.query.ID,
        req.body.QualificationType ,
        req.body.Subject,
        req.body.Grade,
        req.body.Weighting);
    }

    if (req.body.QualificationType == "GCSE or equivalent" && !tools.hasNumber(req.body.Grade)) {
      res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications?hasError=yes&errorType=grades");
    }
    res.redirect(301, '/' + base_url + req.params[0] + "/create/qualifications-list?hasError=no");

  })
  router.get('/' + base_url + '*/create/qualifications-list', function(req, res) {
    req.session.data.qualifications = req.session.data.qualifications || [];

    // create a new array if no array exists.
    if (req.query.show_defualt_qualifications){
      req.session.data.qualifications = req.session.data.default_qualifications
    }

    var page = "/create/qualifications-list"
    req.session.data.showQualificationAlert = "no";
    // create a new array if no array exists.
    if (req.query.removeID) {
      req.session.data.showQualificationAlert = "yes"
      tools.removeFromList(req.session.data.qualifications, req.query.removeID);

    } else {
      console.log("ADDING")
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
  router.get('/' + base_url + '*/create/qualifications-list-referred', function(req, res) {
    res.render(base_url + req.params[0] + "/create/qualifications-list-referred", {
      "query": req.query
    })
  })
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
  router.post('/' + base_url + '*/create/skills', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
  })
  router.post('/' + base_url + '*/create/short-description', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
  })
  router.post('/' + base_url + '*/create/things-to-consider', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
  })
  router.post('/' + base_url + '*/create/contact', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + "/create/vacancy-preview?edit=no");
  })





  //#confirmationj
  router.post('/' + base_url + '*/create/confirmation', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-' + req.session.vacancies)
    // if(req.session.force_notifcation_setup == "yes" && req.session.has_notifications == "no"){
    //     res.redirect(301, '/' + base_url + '/notifications/receive-notifications');
    // }else{
    //   res.redirect(301, '/' + base_url + '/dashboard-'+req.session.vacancies)
    // }
  })
  // -------------------------------
  // #NOTIFCATIONS
  // -------------------------------
  router.post('/' + base_url + '*/notifications/receive-notifications', function(req, res) {
    if (req.body.receive_notification == "yes") {
      req.session.receive_notification = 'yes'
      req.session.has_notifications = 'no'
      res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notification-preferences-new');
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-' + req.session.vacancies)
    }
  })
  router.get('/' + base_url + '*/notifications/notification-preferences', function(req, res) {
    var page = "/notifications/notification-preferences"

    if (req.session.data.has_notifications == "no") {
      page = '/notifications/notification-preferences-new'
    }
    res.render(base_url + req.params[0] + page, {
      "query": req.query,
      "new": req.query.new,
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + page);
      }
        throw err;
      }
      res.send(html);
    });
  })
  router.post('/' + base_url + '*/notifications/notification-preferences', function(req, res) {
    if (req.body.receive_notification != "_unchecked") {
      req.session.force_notifcation_setup = "no"
      req.session.has_notifications = "yes"
      res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notificaiton-confirmation?new=no')
    } else {
      req.session.has_notifications = "no"
      res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notificaiton-confirmation-unsubscribe')
    }
  })

  router.post('/' + base_url + '*/notifications/notification-preferences-new', function(req, res) {
    if (req.body.receive_notification) {
      req.session.force_notifcation_setup = "no"
      req.session.has_notifications = "yes"
    }
    res.redirect(301, '/' + base_url + req.params[0] + '/notifications/notificaiton-confirmation?new=yes')

  })


  router.get('/' + base_url + '*/notifications/notificaiton-confirmation', function(req, res) {
    res.render(base_url + req.params[0] + '/notifications/notificaiton-confirmation', {
      "query": req.query,
      "new": req.query.new,
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + '/notifications/notificaiton-confirmation');
      }
        throw err;
      }
      res.send(html);
    });
  })
  router.post('/' + base_url + '*/notifications/notificaiton-confirmation', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-' + req.session.vacancies)
  })
  router.post('/' + base_url + '/notifications/notificaiton-confirmation-unsubscribe', function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/dashboard-' + req.session.vacancies)
  })

  router.post('/' + base_url + '*/account/close', function(req, res) {

    if (req.body.ConfirmClose == "true") {
      res.redirect(301, '/' + base_url + req.params[0] + '/account/manage-vacancy-closed?alert=yes')
    } else {
      res.redirect(301, '/' + base_url + req.params[0] + '/account/manage-vacancy')
    }

  })

  router.post('/' + base_url + '*/account/close', function (req, res) {

    if(req.body.ConfirmClose == "true"){
        res.redirect(301, '/' + base_url + '/account/manage-vacancy-closed?alert=yes')
    }else{
      res.redirect(301, '/' + base_url + '/account/manage-vacancy')
    }

  })
  router.post('/' + base_url + '*/account/clone-dates', function (req, res) {

    if(req.body.change_date == "yes"){
      res.redirect(301, '/' + base_url + req.params[0] + '/create/vacancy-preview-cloned')
    }else{
      res.redirect(301, '/' + base_url + req.params[0] + '/account/clone-change-dates?edit=yes')

    }

  })
  router.post('/' + base_url + '*/account/clone-location', function (req, res) {
    req.session.ApplicationMethod = 'ThroughFindAnApprenticeship'
    if(req.body.change_location == "yes"){
      res.redirect(301, '/' + base_url + '/vacancy-preview-cloned')
    }else{
      res.redirect(301, '/' + base_url + '/account/clone-change-location')

    }

  })

  // Base page router
  router.get('/' + base_url + '*', function(req, res) {
    console.log("Rendering page: " + req.params[0])
    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder
    dir.shift()
    var baseDir = ""
    dir.forEach(function(element) {
      var path = "/" + element
      baseDir += path

    })
    res.render(base_url + req.params[0], {"query":req.query},function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
        return res.render(file_url + baseDir,{"query":req.query});
      }
        throw err;
      }
      res.send(html);
    });
  })


  // router.post('/' + base_url + '/*/create/confirm-employer', function (req, res) {
  //   res.redirect(301, '/' + base_url + '/'+ req.params[0] +'/create/location')
  // })






}
