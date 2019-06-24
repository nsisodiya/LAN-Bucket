/**
 * Created by narendrasisodiya on 25/01/17.
 */
//This file will scan whole network and give all active IP address.
//This will exclude its own ip only.

var request = require("request");
console.log("Finding Peers");
var availablePeers = [];
request("http://192.168.1.113:50469", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var isValidLanBucketServer = false;
        try {
            isValidLanBucketServer = JSON.parse(body).server === "LAN-Bucket";
        } catch (ex) {
            //pass error
        }
        if (isValidLanBucketServer === true) {
            var configData = JSON.parse(body);
            availablePeers.push({
                ip: "192.168.1.104",
                name: configData.userName
            });
            console.log(availablePeers);
        } else {
            console.log("Not a valid");
        }
    } else {
        console.error(error)
    }
}, function () {
    console.log(arguments);
});