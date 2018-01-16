const expect = require('expect');

var {isRealString} = require('./validation')
describe('Verify String is valid or not',()=>{
 it('Should reject non string value',()=>{
   var str= 12344;
   var res=isRealString(str);
   expect(res).toBe(false);
 })

 it('Should reject  string with spaces',()=>{
   var str= "     ";
   var res=isRealString(str);
   expect(res).toBe(false);
 })

 it('Should allow  string with non space character',()=>{
   var str= "   adhaajdkljd  kdjkajkd ";
   var res=isRealString(str);
   expect(res).toBe(true);
 })
})
