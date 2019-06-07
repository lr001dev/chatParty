console.log(`loaded client.js`)
const socket = io()

$(() => {
	  //Lets send a message to server
	  $(`#chat`).submit((e) => {
	  e.preventDefault()
	  socket.emit(`chat message`, $(`#m`).val())
	  socket.emit(`chat message`, $(`#m`).val(),room,pic,userName)

	  $(`#m`).val(``)
	  //Not sure why we are returning false
	  return false
	  })
	  socket.on(`chat message`, (msg,pic,userName) => {
	      //Looking to see if we get message back from server
	      console.log(msg)
        console.log(pic)
	      $(`#messages`).append($(`<li>`).append($(`<img>`).attr(`src`, `/${pic}`).attr(`class`, `avatar img-thumbnail rounded`)).append($(`<p>`).attr(`class`, `chat-text`).text(`${ userName } : ${msg}`)))
	    })
	})
