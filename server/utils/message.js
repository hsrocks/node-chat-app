const moment = require('moment');

var generateMessage = (from,text)=>{
    return {
      from,
      text,
      createdAt :  moment().valueOf() //  new Date().getTime() - also gives time in milli but  we will use moment throughout so make it consistent
    }
}
var generateLocationMessage = (from,latitude,longitude)=>{
    return {
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
      createdAt : moment().valueOf()
    }
}

 module.exports ={
   generateMessage,
   generateLocationMessage
 }
