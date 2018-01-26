class Users{
  constructor (){
    this.users = [];
    this.room = [];
  }
  addRoom (room){
    var roomLower = room.toLowerCase();
    var rooms= this.room.filter((roomVal)=>{
      return roomVal.toLowerCase() === roomLower;
    });
    if(!(rooms.length>0)){
      this.room.push(room);
    }
  }
  removeRoom(room){
    var roomLower= room.toLowerCase()
    var rooms= this.room.filter((roomName)=>{
      return roomLower===roomName.toLowerCase();
    });
    var index = this.room.indexOf(rooms[0]);
    if (index > -1) {
    this.room.splice(index, 1);
  }
  return rooms[0];
  }
  addUser (id,name,room){
    room = room.toLowerCase();
    var user ={id , name ,room};
    this.users.push(user);
    return user;
  }

  getRoom (){
    return this.room;
  }
  removeUser(id){
    var user= this.users.filter((user)=>{
      return user.id === id;
    });
    var index = this.users.indexOf(user[0]);
    if (index > -1) {
    this.users.splice(index, 1);
  }
  return user[0];
  }
  getUser(id){
    // We got array of users object
    var user= this.users.filter((user)=>{
      return user.id === id;
    });
    return user[0];
  }
  getUserList(room){
    // We got array of users object
    room = room.toLowerCase();
    var users= this.users.filter((user)=>{
      return user.room === room;
    });
    // we will get the array of user name from users array we filtered
    var namesArray= users.map((user)=>{
      return user.name;
    })
    return namesArray;
  }
}

module.exports= {Users}


// class User{
//   constructor (name , age){
//     this.name = name;
//     this.age = age;
//   }
//   generateUserMessage(){
//     console.log(this.name);
//   }
// }
// var me =new User('hs',23);
// me.generateUserMessage();
