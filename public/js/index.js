var socket = io();
socket.on('connect',function(){
  console.log('Connected to a server');

});
socket.on('disconnect',function(){
  console.log('Disconnected to a server');
})
socket.on('newMessage',function(message){
  console.log('New Message Recieved',message);
  var li = $('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  $('#messages').append(li)
})

socket.on('newLocationMessage',function(message){
  console.log('New Message Recieved',message);
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current Location</a>')
  li.text(`${message.from} :`);
  a.attr('href',message.url)
  li.append(a);
  $('#messages').append(li)
})
var messageTextBox = $('[name=message]');
$('#message-form').on('submit', function(event){
  // to override the default behaviour of form to refresh it every time we submit we use preventDefault
  event.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextBox.val()
  },function(){
      text: messageTextBox.val('')
  })
})

var locationButton = $('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your user')
  }
  locationButton.attr('disabled','disabled').text('Sending Location ...')
  navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('Send Location ...')
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    })
  },function(){
    locationButton.removeAttr('disabled').text('Send Location ...')
    alert('Unable to fetch location')
  })
})
