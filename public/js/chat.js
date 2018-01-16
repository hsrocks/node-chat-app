var socket = io();

function scrollToBottom(){
  //selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child')
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  if(scrollTop  + clientHeight+ newMessageHeight >= scrollHeight){
    // scrollTop is jQuery method to set  the scrollTop and we set it to scrollHeight
    messages.scrollTop(scrollHeight)
  }
}
socket.on('connect',function(){
  var params = $.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
      alert(err)
      window.location.href = "/"
    }
    else{
      console.log('No error')
    }
  })
});
socket.on('disconnect',function(){
  console.log('Disconnected to a server');
})
socket.on('newMessage',function(message){
   var formattedTime = moment(message.createdAt).format('h:mm a')
  // var li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // $('#messages').append(li)
  // .html() gives the markup inside the id : message-template
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text : message.text,
    from : message.from,
    createdAt : formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
})

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a')
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current Location</a>')
  // li.text(`${message.from} ${formattedTime}:`);
  // a.attr('href',message.url)
  // li.append(a);
  // $('#messages').append(li)
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    url : message.url,
    from : message.from,
    createdAt : formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
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
