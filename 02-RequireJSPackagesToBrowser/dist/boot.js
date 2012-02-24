require.bundle("", function(require)
{
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
    require.memoize("/main.js", define('',['require','exports','module','helpers/greetings','helpers/logger','letters/H'],function(require, exports, module)
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
    }));
    require.memoize("b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/greetings.js", define('',['require','exports','module','package/hello'],function(require, exports, module)
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
    }));
    require.memoize("b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/logger.js", define('',['require','exports','module'],function(require, exports, module)
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
    }));
    require.memoize("7c6ac439eb93e47d1c182c68092caf4ae323c5c4/words/hello.js", function(require, exports, module)
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
        
    });
    require.memoize("108cbe849fb3dc44e8a21940a3ba536c0b08aa74/H.js", define('',['require','exports','module'],function(require, exports, module)
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
    }));
    require.memoize("/package.json", {"main":"/main.js","mappings":{"helpers":"b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe","letters":"108cbe849fb3dc44e8a21940a3ba536c0b08aa74"},"directories":{"lib":""}});
    require.memoize("b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe/package.json", {"mappings":{"package":"7c6ac439eb93e47d1c182c68092caf4ae323c5c4"},"directories":{"lib":""}});
    require.memoize("7c6ac439eb93e47d1c182c68092caf4ae323c5c4/package.json", {"mappings":{"package":"b7e3fe2b00b4550bbd0600676eeee1eb6ad55bbe","letters":"108cbe849fb3dc44e8a21940a3ba536c0b08aa74"},"directories":{"lib":"words"}});
    require.memoize("108cbe849fb3dc44e8a21940a3ba536c0b08aa74/package.json", {"directories":{"lib":""},"mappings":{}});
});