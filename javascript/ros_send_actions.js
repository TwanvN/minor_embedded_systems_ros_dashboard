const forms = document.querySelectorAll('form');
const form = forms[0];

const mylist = document.getElementById("myList");

document.getElementById("position-submit").addEventListener("click", sendNewTargetPosition);
document.getElementById("axis-submit").addEventListener("click", sendNewAxisValue);
document.getElementById("home-x-axis-button").addEventListener("click", () => { homeAxis(0) });
document.getElementById("home-y-axis-button").addEventListener("click", () => { homeAxis(1) });
document.getElementById("home-all-button").addEventListener("click", () => { homeAxis(2) });
document.getElementById("start-detection-scan-button").addEventListener("click", sendScanCommand);
document.getElementById("start-detection-gathering-button").addEventListener("click", sendDataGatheringCommand);

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

var homeAxisTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/home_axis',
    messageType: 'std_msgs/Int8'
});

var scanCommandTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/scan_command',
    messageType: 'std_msgs/Int8'
});

var dataGatheringCommandTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/data_gathering_command',
    messageType: 'std_msgs/Int8'
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
        var searchtext = axis;
        var index;

        for (var i = 0; i < mylist.options.length; ++i) {
            if (mylist.options[i].text === searchtext) {
                index = i;
                break;
            };
        }

        const messageValue = (i - 1) + " " + document.getElementById('target-axisValue').value;
        console.log(messageValue);

        var axisValue = new ROSLIB.Message({
            data: messageValue
        });

        axisPositionTopic.publish(axisValue);
    } else {
        console.log("No actual axis");
    }
}

/**
 * 
 * @param {number} axisToHome
 */
function homeAxis(axisToHome) {
    var axisValue = new ROSLIB.Message({
        data: axisToHome
    });

    homeAxisTopic.publish(axisValue);
}

function sendScanCommand() {
    var startCommand = new ROSLIB.Message({
        data: 1
    });

    scanCommandTopic.publish(startCommand);
}

function sendDataGatheringCommand() {
    var startCommand = new ROSLIB.Message({
        data: 1
    });

    dataGatheringCommandTopic.publish(startCommand);
}
