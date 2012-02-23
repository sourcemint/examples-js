
var PATH = require("path"),
    CONNECT = require("connect"),
    BUNDLER = require("sourcemint-platform-nodejs/lib/bundler");


exports.main = function(onReadyDeferred, options)
{
    var server = CONNECT();

    server.use(CONNECT.router(function(app)
    {
        app.get(/^\/$/, CONNECT.static(__dirname));

        app.get(/^\/loader.js/, CONNECT.static(PATH.dirname(require.resolve("sourcemint-loader-js/loader.js"))));
        
        app.get(/^\/packages\/([^\/]*?)(\.js)?(\/(.*))?$/, function (req, res)
        {
            var modulesPath = __dirname + "/packages/" + req.params[0];

            // TODO: Maybe we can do without this.
            req.url = req.url.substring(10 + req.params[0].length + (req.params[1] || "").length);

            // TODO: Make this `connect` compatible.
            BUNDLER.Middleware(modulesPath, __dirname + "/dist", {
                packageIdHashSeed: "__EXAMPLE__",
                // NOTE: Can only request rebuild for root bundle at this time. If an additional-load
                //       bundle is rebuilt the existing modules will be incorrect (as root bundle was not loaded first).
                // TODO: Rebuild parent bundles if not available, then requested bundle. Need to keep extra meta info for this.
                rebuild: ((req.url === "")?true:false)
            }).handle(req, res);
        });
    }));

    /*TEST*/ if (onReadyDeferred) {
    /*TEST*/     server.once("listening", function() {
    /*TEST*/         onReadyDeferred.resolve(function onTestDone(stoppedCallback) {
    /*TEST*/             server.once("close", function() {
    /*TEST*/                 stoppedCallback();
    /*TEST*/             });
    /*TEST*/             server.close();
    /*TEST*/         });
    /*TEST*/     });
    /*TEST*/ }

    server.listen(options.port, "127.0.0.1");

    console.log("Server running at http://127.0.0.1:" + options.port + "/");
}

if (require.main === module) {
    exports.main(null, {
        port: 1337
    });
}
