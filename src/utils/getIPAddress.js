/**
 * Created by narendrasisodiya on 25/01/17.
 */


var os = require("os");
var clone = (x) => JSON.parse(JSON.stringify(x));
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === "IPv4" && !address.internal) {
            addresses.push(clone(address));
        }
    }
}

console.log(addresses);

module.exports = addresses;