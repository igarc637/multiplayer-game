const socket = io();
let myRole = '';

socket.on('roleAssignment', (data) => {
    myRole = data.role;
    document.getElementById('role').innerText = `You are the ${myRole}`;
    document.getElementById('game').style.display = 'block';

    if (myRole === 'describer') {
        document.getElementById('describerUI').style.display = 'block';
    } else {
        document.getElementById('guesserUI').style.display = 'block';
    }
});

function buzz() {
    socket.emit('buzzStutter');
}

socket.on('penalty', (data) => {
    const li = document.createElement('li');
    li.textContent = `⚠️ Player ${data.buzzer} buzzed for a stutter!`;
    document.getElementById('log').appendChild(li);
});
