module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON
  var Fuse = require('fuse.js');
  var version = '0-1-9'
  var base_url = 'raa-v2/' + version + '/RVDB-46-select-provider';
  var home_url = 'raa-v2/' + version + '/recruitment';

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
    console.log("name= "+name)
    console.log("test out put is : "+/[a-zA-Z]/.test(name))
    req.session.data.providerName == req.body.providerName.slice(0,index)
    res.redirect(301, '/' + base_url + req.params[0]+"/confirm-training-provider?providerName="+name+"&UKPRN="+ukprn)
  })
  router.post('/' + base_url + '/vacancy-preview/confirm-training-provider', function (req, res) {
    res.redirect(301, '/' + base_url + "/vacancy-preview/vacancy-preview")
  })


}
