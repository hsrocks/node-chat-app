const {Users} = require('./users');
const expect = require('expect');

describe('Users',()=>{
var users;

beforeEach(()=>{
  users=new Users();
  users.users=[{
    id : '1',
    name : 'Mike',
    room : 'Node'
  },{
    id : '2',
    name : 'Gen',
    room : 'React'
  },
  {
    id : '3',
    name : 'Julie',
    room : 'Node'
  }]
})
it('should add new users',()=>{
  var users=new Users();
  var user = {
    id : '123',
    name : 'Andrew',
    room : 'The Office Fans'
  }
  users.addUser(user.id,user.name,user.room);
  expect(users.users).toEqual([user]);
})

it('should remove a user',()=>{
  var user = users.removeUser('1')
  expect(users.users.length).toBe(2);
  expect(user).toEqual({
    id : '1',
    name : 'Mike',
    room : 'Node'
  })
})
it('should not remove a user',()=>{
  var user = users.removeUser('4')
  expect(users.users.length).toBe(3);
  expect(user).toNotExist();
})

it('should find a user',()=>{
  var user = users.getUser('1')
  expect(users.users.length).toBe(3);
  expect(user).toEqual({
    id : '1',
    name : 'Mike',
    room : 'Node'
  })
})

it('should not find a user',()=>{
  var user = users.getUser('400')
  expect(user).toNotExist();
})
it('should return names for Node course',()=>{
  var userList = users.getUserList('Node');
  expect(userList).toEqual(['Mike','Julie']);
})
})
