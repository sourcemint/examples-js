// @sourcemint-bundle-ignore: 
require.bundle("", function(require)
{
// @sourcemint-bundle-header: {}
function define(id, dependencies, moduleInitializer)
{
    return function(require, exports, module) {
        if (typeof moduleInitializer === "function") {
            return moduleInitializer.apply(moduleInitializer, dependencies.map(function(name) {
                if (name === "require") return require;
                if (name === "exports") return exports;
                if (name === "module") return module;
                return require(name);
            }))
        } else
        if (typeof dependencies === "object") {
            return dependencies;
        }
    }
}
// @sourcemint-bundle-module: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger/console.js","fileMtime":1329968770000,"id":"/logger/console.js"}
require.memoize("/logger/console.js", 
define('',['require','exports','module'],function(require, exports, module)
{
    // TODO: Allow mapping a global to a package alias in package.json.
    //       var JQUERY = require("$");  // Where '$' is mapped to <Global>.$ which is jQuery in this case.
    //       Also map to pureJS file and export globals so we can require them here.
    var JQUERY = $;

    exports.log = function(message)
    {
        JQUERY.get(require.sandbox.id + require.id("./suffix.json"), function(data)
        {
            console.log(message + data.character);
        });
    }
})
);
// @sourcemint-bundle-descriptor: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/package.json","id":"/package.json"}
require.memoize("/package.json", 
{"mappings":{},"main":"/logger/console.js","directories":{"lib":""}}
);
// @sourcemint-bundle-ignore: 
});
// @sourcemint-bundle-report: {"sourceReport":{"mainPackage":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA","packages":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA":{"mainModule":{"path":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger/console.js"},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger/console.js":{"staticLinks":{},"fileMtime":1329968770000,"treatAs":"js-module"}},"mappings":{}}}},"mappedReport":{"mainPackage":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA","packages":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA":{"mainModule":{"path":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger/console.js"},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger/console.js":{"staticLinks":{},"fileMtime":1329968770000,"treatAs":"js-module"}},"mappings":{}}}},"bundleReport":{"mainBundle":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/dist/boot/b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/logger/console.js","packages":{},"modules":{"/logger/console.js":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger/console.js"}}}
