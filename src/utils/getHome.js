/**
 * Created by narendrasisodiya on 25/01/17.
 */
function getUserHome() {
    return process.env.HOME || process.env.USERPROFILE;
};

module.exports = getUserHome();