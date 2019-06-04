console.log(`loaded client js`)
//Define varaible to envoke socket
const socket = io()
//Receiving message back from Server
socket.on(`chat message`, (msg) => {
    //Looking to see if we get message back from server
    console.log(msg)
    $(`#messages`).append($(`<li>`).text(msg))

  })
$(() => {
  //Lets send a message to server
  $(`#chat`).submit((e) => {
  e.preventDefault()
  socket.emit(`chat message`, $(`#m`).val())
  $(`#m`).val(``)
  //Not sure why we are returning false
  return false
  })
})
