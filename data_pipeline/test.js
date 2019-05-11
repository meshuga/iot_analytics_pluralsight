var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: "connect_device_package/thing-patryk.private.key",
    certPath: "connect_device_package/thing-patryk.cert.pem",
    caPath: "connect_device_package/AmazonRootCA1.pem",
    clientId: "sdk-nodejs-0aa19936-d849-4343-b4d2-0a4312d5eaff",
    host: "a3nadz27uidpjv-ats.iot.ap-northeast-1.amazonaws.com"
});

const initialCoordinates = {
    lat: 46.6314609,
    lon: -99.34467
};

const endingCoordinates = {
    lat: 46.6302106,
    lon: -96.8319174
};

const driveTime = 2 * 60; // 2 hours in minutes
let counter = 0;
let endTime = new Date();
let rideId = Math.floor(Math.random() * 1000);

while (counter < driveTime) {
    let currentCoordinates = {
        lat: initialCoordinates.lat + (endingCoordinates.lat - initialCoordinates.lat) * (counter / driveTime),
        lon: initialCoordinates.lon + (endingCoordinates.lon - initialCoordinates.lon) * (counter / driveTime)
    };

    counter++;
    let message = {
        rideId: rideId,
        temperature: 77.2 + 0.02 * counter,
        timestamp: Math.floor(new Date(endTime.getTime() - (driveTime - counter) * 60 * 1000).getTime()),
        location_lat: currentCoordinates.lat,
        location_lon: currentCoordinates.lon
    };
    device.publish('truck_sensor', JSON.stringify(message));
}