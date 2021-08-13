// -------------------------------
// #utils
// -------------------------------
var findByID = function (array, value) {
  for (var i = 0; i < array.length; i++) {

    if (array[i].ID == value) {

      return array[i];
    }
  }
  return false;
}
module.exports = {
getEmployersList: function ($employers, $amount) {
  var newEmployersList = []
  var rand
  for (var i = 0; i < $amount; i++) {
    var rand = $employers[Math.floor(Math.random() * $employers.length)];
    newEmployersList.push(rand)
  }
  return newEmployersList
},

makeCurrancyValue: function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
},

getMinWage : function ($data) {
  return Math.round(($data.weeklyHours * 52) * $data.nationalMinWage)
},

isUnderMinWage : function ($data) {
  var minWage = getMinWage($data)
  if ($data.WageType == "fixedWage" && parseInt($data.FixedWageYearlyAmount) < minWage) {
    return true
  }
  return false
},

getKeyByValue : function (object, value) {
  return Object.keys(object).find(key => object[key] === value);
},

removeFromList : function (array, value) {
  for (var i = 0; i < array.length; i++) {

    if (array[i].ID == value) {
      array.splice(i, i + 1);
      return true;
    }
  }
  return false;
},

editListItem : function(array, id,type,subject,grade,weight){
  var obj = findByID(array, id)
  obj.ID = id;
  obj.type = type;
  obj.subject =   subject;
  obj.grade = grade
  obj.weight = weight
},

hasNumber : function (myString) {
  return /\d/.test(myString);
}
}
