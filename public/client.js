const socket = io(); // connect to server
console.log("My socket ID is:", socket.id);

// When the button is clicked, emit an event to the server
document.getElementById('magic').addEventListener('click', () => {
  socket.emit('buttonClicked');
});
