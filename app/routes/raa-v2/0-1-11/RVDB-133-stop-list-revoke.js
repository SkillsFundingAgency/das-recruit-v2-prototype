module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var version = '0-1-11'
  var base_url = 'raa-v2/' + version + '/RVDB-133-stop-list-revoke';
  var home_url = 'raa-v2/' + version + '/recruitment';

  function findTrainingByName($data,$name){
    return $data.find( o => o.name === $name );
  }

  router.post('/' + base_url + '*/select-training-provider', function (req, res) {
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
    req.session.data.providerName == name
    if(name == "PLUMPTON COLLEGE "){
      res.redirect(301, '/' + base_url + req.params[0]+"/select-training-provider?hasError=yes&errorType=provider&has_training_provider=yes")
    }else{
      req.session.data.providerName == req.body.providerName.slice(0,index);
    }


    if(req.query.edit=="yes" && req.body.has_training_provider == "no"){
      res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview?edit=no")

    }
    if(req.body.has_training_provider == "yes"){
      if(req.query.provider_blocked){
        res.redirect(301, '/' + base_url + "/select-training-provider?hasError=yes&errorType=provider")
      }
      res.redirect(301, '/' + base_url + req.params[0]+"/confirm-training-provider?providerName="+name+"&UKPRN="+ukprn)

    }else{
      res.redirect(301, '/' + base_url + req.params[0]+"/positions?providerName=")


    }

  })

}
