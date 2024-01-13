// Connecting to ROS
// -----------------
var ros = new ROSLIB.Ros();

// If there is an error on the backend, an 'error' emit will be emitted.
ros.on('error', function (error) {
    let span = document.getElementById("connection_tag");
    span.textContent = "Error";
    span.style.color = 'yellow';
    console.log(error);
});

// Find out exactly when we made a connection.
ros.on('connection', function () {
    let span = document.getElementById("connection_tag");
    span.innerHTML = "Connected";
    span.style.color = 'green';
    console.log('Connection made!');
});

ros.on('close', function () {
    let span = document.getElementById("connection_tag");
    span.textContent = "No connection";
    span.style.color = 'red';
    console.log('Connection closed.');
});

// Create a connection to the rosbridge WebSocket server.
ros.connect('ws://' + location.hostname + ':9090', 'echo-protocol');