const forms = document.querySelectorAll('form');
const form = forms[0];

document.getElementById("position-submit").addEventListener("click", sendNewTargetPosition);

var targetPositionTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/target_position',
    messageType: 'std_msgs/Int16MultiArray'
});

function sendNewTargetPosition() {
    let dataArray = []

    Array.from(form.elements).forEach((input) => {
        if (input.type == "text") {
            console.log(input);
            dataArray.push(parseInt(input.value));
        }
    });

    console.log(dataArray);

    var position = new ROSLIB.Message({
        data: dataArray
    });

    targetPositionTopic.publish(position);
    console.log("Yas");
}