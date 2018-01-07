const expect = require('expect');
var {generateMessage} = require('./message')
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
