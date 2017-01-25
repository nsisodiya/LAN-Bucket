/**
 * Created by narendrasisodiya on 25/01/17.
 */

var appRouter = function (app) {
    app.get("/", function (req, res) {
        res.json({
            server: "LAN-Bucket",
            userName: process.env.USER
        });
    });
};

module.exports = appRouter;