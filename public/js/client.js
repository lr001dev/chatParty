console.log(`loaded client js`)
//Define varaible to envoke socket
const socket = io()

// const room = 'test'
// //Receiving message back from Server
// socket.on('connect', function() {
//  // Connected, let's sign-up for to receive messages for this room
//  socket.emit('room', room);
// })

// <script>
//   const room = `<%= roomName %>`
//   //Receiving message back from Server
//   socket.on('connect', function() {
//    // Connected, let's sign-up for to receive messages for this room
//    socket.emit('room', room);
//  }) </script>

$(() => {

  //Lets send a message to server
  $(`#chat`).submit((e) => {
  e.preventDefault()
  socket.emit(`chat message`, $(`#m`).val(),room)
  // io.to(room).emit(`chat message`, $(`#m`).val())
  // io.to(room).emit(`chat message`, $(`#m`).val())
  $(`#m`).val(``)
  //Not sure why we are returning false
  return false
  })
  socket.on(`chat message`, (msg) => {
      //Looking to see if we get message back from server
      console.log(msg)
      $(`#messages`).append($(`<li>`).text(msg))

    })
})
