const comuni = require('../includes/comuni.js');
const nazioni = require('../includes/nazioni.js');
const docs = require('../includes/docs.js');
const type = require('../includes/type.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/checkins');

const Guest = new Schema({
  guesttype: String,
  name: {type: String, required: "NAME_IS_REQUIRED"},
  surname: {type: String, required: "SURNAME_IS_REQUIRED"},
  gender: {
    type: String, 
    required: "GENDER_IS_REQUIRED",
    validate: [(gender) => {
      var genders = ["M","F"];
      return genders.indexOf(gender)!=-1
    }, 'GENDER_IS_REQUIRED']
  },
  citizenship: {type: String, required: "CITYZENSHIP_IS_REQUIRED",
    validate: [(citizenship) => {
      return citizenship!=0
    }, 'CITYZENSHIP_IS_REQUIRED']
  },
  birthdate: {type: Date, required: "BIRTHDATE_IS_REQUIRED"},
  birthcountry: {type: String, required: "BIRTH_COUNTRY_IS_REQUIRED",
    validate: [(birthcountry) => {
      return birthcountry!=0
    }, 'BIRTH_COUNTRY_IS_REQUIRED']
  },
  birthmunicipality: {
    type: String,
    required: function() { return this.birthcountry == "100000100" ?  "BIRTH_MUNICIPALITY_IS_REQUIRED" : false}
  },
  birthprovince: {  type: String  },
  doctype: {
    type: String,
    required: function() { return ["16", "17", "18"].indexOf(this.guesttype)!=-1 ?  "DOCTYPE_MUNICIPALITY_IS_REQUIRED" : false}
  },
  docnumber: {
    type: String,
    required: function() { return ["16", "17", "18"].indexOf(this.guesttype)!=-1 ?  "DOCTYPE_MUNICIPALITY_IS_REQUIRED" : false}
  },
  doccountry: {
    type: String,
    required: function() { return ["16", "17", "18"].indexOf(this.guesttype)!=-1 ?  "DOCTYPE_MUNICIPALITY_IS_REQUIRED" : false}
  },
  docmunicipality: {
    type: String,
    required: function() { return ["16", "17", "18"].indexOf(this.guesttype)!=-1 && this.doccountry == "100000100" ?  "DOCTYPE_MUNICIPALITY_IS_REQUIRED" : false}
  },
  email: {
    type: String,
    trim: true, 
    index: true, 
    /* unique: true, */
    sparse: true,
    /* required: "EMAIL_IS_REQUIRED", */
    validate: [(email) => {
      //var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    }, 'EMAIL_IS_NOT_VALID']
  },
  phone: String
},{ _id : false });

const Reservation = mongoose.model('Guest',{
  reservation: String,
  listing: String,
  arrival: {
    type: Date, 
    required: "ARRIVAL_IS_REQUIRED"
  },
  days: {type: Number, required: "DAYS_IS_REQUIRED"},
  guestsnumber: {type: Number, required: "GUEST_NUMBER_IS_REQUIRED"},
  guests:[Guest]
});

exports.get = function get(req, res) {
  res.render('gianlucadelgobbo/checkin', {comuni:comuni, nazioni,nazioni, docs: docs, type: type, myget: req.query});
}
exports.post = function post(req, res) {
  console.log(req.body);
  req.body.guests.forEach(function(guest) {
    console.log(guest)
  });
  const newguest = new Reservation(req.body);
  newguest.save().then((bho) => {
    console.log('meow')
    console.log(bho)
    res.json(bho)
  }).catch(error =>{
    console.log(error);
    res.json(error);
  }); 
}

exports.list = function list(req, res) {
  Reservation.find({}, function(err, reservations) {
    res.render('gianlucadelgobbo/checkin_list', {comuni:comuni, nazioni,nazioni, docs: docs, type: type, myget: req.query, reservations: reservations});
  });
}