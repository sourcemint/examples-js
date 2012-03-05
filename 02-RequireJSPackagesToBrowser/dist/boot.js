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
// @sourcemint-bundle-module: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot/main.js","fileMtime":1329962163000,"id":"/main.js"}
require.memoize("/main.js", 
define('',['require','exports','module','helpers/greetings','helpers/logger','letters/H'],function(require, exports, module)
{
    // One-way dependency.
    var GREETINGS = require("helpers/greetings"),
        LOGGER = require("helpers/logger"),
        LETTERS = require("letters/H");

    exports.main = function(options)
    {
        LETTERS.load(function()
        {
            LOGGER.log(GREETINGS.getGreeting());
        });
    }
})
);
// @sourcemint-bundle-module: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/greetings.js","fileMtime":1329968755000,"id":"b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/greetings.js"}
require.memoize("b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/greetings.js", 
define('',['require','exports','module','package/hello'],function(require, exports, module)
{
    var HELLO = require("package/hello");

    exports.getGreeting = function()
    {
        return HELLO.getWord() + " from " + HELLO.getName();
    }

    exports.getName = function()
    {
        return "02-RequireJSPackagesToBrowser";
    }
})
);
// @sourcemint-bundle-module: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger.js","fileMtime":1329959109000,"id":"b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/logger.js"}
require.memoize("b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/logger.js", 
define('',['require','exports','module'],function(require, exports, module)
{
    exports.log = function(message)
    {
        // NOTE: `require(["./logger/console"], ...)` will currently create a **STATIC** link.
        // TODO: Fix to create a dynamic link instead. See `sourcemint/sdk-requirejs/lib/bundler::parseModule()`

        var loggerID = "./logger/console";

        require([loggerID], function(LOGGER)
        {
            LOGGER.log(message);
        });
    }
})
);
// @sourcemint-bundle-module: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB/words/hello.js","fileMtime":1330114022000,"id":"7c6ac439eb93e47d1c182c68092caf4ae323c5c4/words/hello.js"}
require.memoize("7c6ac439eb93e47d1c182c68092caf4ae323c5c4/words/hello.js", 
function(require, exports, module)
{
    var __filename = require.sandbox.id + "7c6ac439eb93e47d1c182c68092caf4ae323c5c4/words/hello.js";
    var __dirname = require.sandbox.id + "/7c6ac439eb93e47d1c182c68092caf4ae323c5c4/words";
    
    var GREETINGS = require("package/greetings");
    
    exports.getWord = function()
    {
        return require("letters/H").getLetter() + "ello";
    }
    
    exports.getName = function()
    {
        return GREETINGS.getName();
    }
    
}
);
// @sourcemint-bundle-module: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC/H.js","fileMtime":1329962383000,"id":"108cbe849fb3dc44e8a21940a3ba536c0b08aa74/H.js"}
require.memoize("108cbe849fb3dc44e8a21940a3ba536c0b08aa74/H.js", 
define('',['require','exports','module'],function(require, exports, module)
{
    // TODO: Allow mapping a global to a package alias in package.json.
    //       var JQUERY = require("$");  // Where '$' is mapped to <Global>.$ which is jQuery in this case.
    //       Also map to pureJS file and export globals so we can require them here.
    var JQUERY = $;
    
    var letter = false;
    
    exports.load = function(loadedCallback)
    {
        JQUERY.get(require.sandbox.id + require.id("./H.txt"), function(data)
        {
            letter = data;

            loadedCallback();
        });
    }
    
    exports.getLetter = function()
    {
        return letter;
    }
})
);
// @sourcemint-bundle-descriptor: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot/package.json","id":"/package.json"}
require.memoize("/package.json", 
{"main":"/main.js","mappings":{"helpers":"b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe","letters":"108cbe849fb3dc44e8a21940a3ba536c0b08aa74"},"directories":{"lib":""}}
);
// @sourcemint-bundle-descriptor: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/package.json","id":"b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/package.json"}
require.memoize("b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/package.json", 
{"mappings":{"package":"7c6ac439eb93e47d1c182c68092caf4ae323c5c4"},"directories":{"lib":""}}
);
// @sourcemint-bundle-descriptor: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB/package.json","id":"7c6ac439eb93e47d1c182c68092caf4ae323c5c4/package.json"}
require.memoize("7c6ac439eb93e47d1c182c68092caf4ae323c5c4/package.json", 
{"mappings":{"package":"b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe","letters":"108cbe849fb3dc44e8a21940a3ba536c0b08aa74"},"directories":{"lib":"words"}}
);
// @sourcemint-bundle-descriptor: {"file":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC/package.json","id":"108cbe849fb3dc44e8a21940a3ba536c0b08aa74/package.json"}
require.memoize("108cbe849fb3dc44e8a21940a3ba536c0b08aa74/package.json", 
{"directories":{"lib":""},"mappings":{}}
);
// @sourcemint-bundle-ignore: 
});
// @sourcemint-bundle-report: {"sourceReport":{"mainPackage":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot","packages":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot":{"mainModule":{"path":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot/main.js"},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot/main.js":{"staticLinks":{"helpers/greetings":"helpers/greetings","helpers/logger":"helpers/logger","letters/H":"letters/H"},"fileMtime":1329962163000,"treatAs":"js-module"}},"mappings":{"helpers":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA","letters":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC"}},"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA":{"mainModule":{},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/greetings.js":{"staticLinks":{"package/hello":"package/hello"},"fileMtime":1329968755000,"treatAs":"js-module"},"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger.js":{"staticLinks":{},"fileMtime":1329959109000,"treatAs":"js-module"}},"mappings":{"package":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB"}},"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB":{"mainModule":{},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB/words/hello.js":{"staticLinks":{"package/greetings":"package/greetings","letters/H":"letters/H"},"dynamicLinks":{},"fileMtime":1330114022000,"treatAs":"js-module"}},"mappings":{"package":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA","letters":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC"}},"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC":{"mainModule":{},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC/H.js":{"staticLinks":{},"fileMtime":1329962383000,"treatAs":"js-module"}},"mappings":{}}}},"mappedReport":{"mainPackage":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot","packages":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot":{"mainModule":{"path":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot/main.js"},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot/main.js":{"staticLinks":{"helpers/greetings":"helpers/greetings","helpers/logger":"helpers/logger","letters/H":"letters/H"},"fileMtime":1329962163000,"treatAs":"js-module"}},"mappings":{"helpers":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA","letters":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC"}},"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA":{"mainModule":{},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/greetings.js":{"staticLinks":{"package/hello":"package/hello"},"fileMtime":1329968755000,"treatAs":"js-module"},"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger.js":{"staticLinks":{},"fileMtime":1329959109000,"treatAs":"js-module"}},"mappings":{"package":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB"}},"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB":{"mainModule":{},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB/words/hello.js":{"staticLinks":{"package/greetings":"package/greetings","letters/H":"letters/H"},"dynamicLinks":{},"fileMtime":1330114022000,"treatAs":"js-module"}},"mappings":{"package":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA","letters":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC"}},"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC":{"mainModule":{},"modules":{"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC/H.js":{"staticLinks":{},"fileMtime":1329962383000,"treatAs":"js-module"}},"mappings":{}}}},"bundleReport":{"mainBundle":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/dist/boot.js","packages":{"b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA","7c6ac439eb93e47d1c182c68092caf4ae323c5c4":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB","108cbe849fb3dc44e8a21940a3ba536c0b08aa74":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC"},"modules":{"/main.js":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/boot/main.js","b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/greetings.js":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/greetings.js","b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/logger.js":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageA/logger.js","7c6ac439eb93e47d1c182c68092caf4ae323c5c4/words/hello.js":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageB/words/hello.js","108cbe849fb3dc44e8a21940a3ba536c0b08aa74/H.js":"/pinf/workspaces/github.com/sourcemint/examples-js/0/02-RequireJSPackagesToBrowser/packages/packageC/H.js"}}}
