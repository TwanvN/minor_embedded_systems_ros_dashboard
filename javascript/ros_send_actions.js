const forms = document.querySelectorAll('form');
const form = forms[0];

const mylist = document.getElementById("myList");

document.getElementById("position-submit").addEventListener("click", sendNewTargetPosition);
document.getElementById("axis-submit").addEventListener("click", sendNewAxisValue);

var targetPositionTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/target_position',
    messageType: 'std_msgs/Int16MultiArray'
});

var axisPositionTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/axis_target',
    messageType: 'std_msgs/String'
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

function sendNewAxisValue() {
    let axis = mylist.options[mylist.selectedIndex].text;

    if (axis !== "---Choose axis---") {
        const messageValue = axis + " " + document.getElementById('target-axisValue').value;
        console.log(messageValue);

        var axisValue = new ROSLIB.Message({
            data: messageValue
        });

        axisPositionTopic.publish(axisValue);
    } else {
        console.log("No actual axis");
    }
}
