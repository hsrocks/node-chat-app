class Users{
  constructor (){
    this.users = [];
  }
  addUser (id,name,room){
    var user ={id , name ,room};
    this.users.push(user);
    return user;
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
