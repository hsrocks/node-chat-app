const expect = require('expect');
var {generateMessage} = require('./message')
var {generateLocationMessage} = require('./message')
describe('Generate Message',()=>{
 it('Should generate a correct message object',()=>{
   var from = "hs@eg.com";
   var text ="Hi there"
   var message = generateMessage(from,text);
   expect(message.from).toBe("hs@eg.com");
   expect(message.text).toBe("Hi there");
   expect(message.createdAt).toBeA("number")
 })
})
describe('Generate Correct Location Message',()=>{
 it('Should generate a correct message object',()=>{
   var from = "hs@eg.com";
   var latitude = 100;
   var longitude = 100;
   var message = generateLocationMessage(from,latitude,longitude);
   expect(message.from).toBe("hs@eg.com");
   expect(message.url).toBe("https://www.google.com/maps?q=100,100");
   expect(message.createdAt).toBeA("number")
 })
})
