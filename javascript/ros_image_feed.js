var live_feed_rgb_listener = new ROSLIB.Topic({
    ros: ros,
    name: '/Test',
    messageType: 'sensor_msgs/CompressedImage'
});

live_feed_rgb_listener.subscribe(function (message) {
    document.getElementById('live_feed_rgb').src = "data:image/jpeg;base64," + message.data;
});