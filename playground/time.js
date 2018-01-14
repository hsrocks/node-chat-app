const moment = require('moment');
var date = moment()
var date1 = new Date();
console.log(date.format('MMM Do, YYYY'));// Comma will be taken as string
var date2  = moment()
date2.add(2,'year')
console.log(date2.format('MMM Do, YYYY'));
var date3  = moment()
console.log(date3.format('h:mm:ss a'));// Comma will be taken as string
var date4  = moment(10000)
console.log(date4);

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
