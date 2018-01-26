var socket = io();
socket.on('connect',function(){
  socket.on('populate',function(rooms){
    var select = $('<select></select>');
    select.attr("name", "room")
    select.append($('<option></option>').text("---No Room Selected---"));
    rooms.forEach(function(rooms){
      select.append($('<option></option>').text(rooms));
    });
    $('#rooms').html(select);
    $("#room-name").change(function(){
    if($("#room-name").val().trim().length>0){
      select.prop('disabled',true);
    }
    else{
      select.prop('disabled',false);
    }
    });
  });
});
