
var Validators = {};


Validators.checkCustomerID = function(customerID){
  var errors = [];
  if(!customerID){
    errors.push({name:"to_client[name]",m:__("You have to insert a valid customer")});
  }
  return errors;
};

// General Functions //
Validators.validateStringLength = function(s, min, max) {
  if (!s) return false;
  return s.length <= max && s.length >= min;
};

Validators.validateEmail = function(e) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(e);
};
Validators.is_date = function (aaaa,mm,gg){
  var res = true;
  var mmNew = parseFloat(mm)-1;
  mm = (mmNew.toString().length==1 ? "0"+mmNew : mmNew);
  var dteDate=new Date(aaaa,mm,gg);
  if (!((gg==dteDate.getDate()) && (mm==dteDate.getMonth()) && (aaaa==dteDate.getFullYear())))
    res = false;
  return res;
};

if (typeof exports !== 'undefined') exports.Validators = Validators;
