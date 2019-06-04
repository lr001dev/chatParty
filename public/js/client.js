console.log(`loaded client js`)
$(() => {
  const socket = io()
  $(`#chat`).submit((e) => {
  e.preventDefault()
  socket.emit(`chat message`, $(`#m`).val())
  $(`#m`).val(``)
  return false
  })
})
