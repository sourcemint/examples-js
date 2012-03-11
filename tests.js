
var EXAMPLES = require("sourcemint-platform-nodejs/tests/examples"),
    ERROR = require("sourcemint-platform-nodejs/lib/util/error"),
    EXEC = require("child_process").exec;
    PATH = require("path"),
    FS = require("fs"),
    Q = require("q");


exports.main = EXAMPLES.main;

if (require.main === module) {
    exports.main({
        packageBasePath: __dirname,
        examplesPath: "",
        extraExamples: [],
        run: false
    }).then(function() {
        
        var done = Q.ref();
        
        var basePath = __dirname;

        FS.readdirSync(basePath).forEach(function(filename)
        {
            var exampleBasePath = basePath + "/" + filename;

            if (PATH.existsSync(exampleBasePath + "/package.json") &&
                PATH.existsSync(exampleBasePath + "/test.js"))
            {
                done = Q.when(done, function()
                {
                    return runExample(exampleBasePath);
                });
            }
        });

        return done;

    }).fail(function(err) {
        ERROR.logError(err);
    });
}

function runExample(path)
{
    var deferred = Q.defer();

    console.log("Running example: " + path);

    EXEC("npm test", {
        cwd: path
    }, function(err, stdout, stderr)
    {
        if (err) deferred.reject(err);
        else if (stderr) deferred.reject(stderr)
        else {
            
            process.stdout.write(stdout);

            deferred.resolve();
        }
    });

    return deferred.promise;
}
