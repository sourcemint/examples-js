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
    require.memoize("/logger/console.js", define('',['require','exports','module'],function(require, exports, module)
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
    }));
    require.memoize("/package.json", {"mappings":{},"main":"/logger/console.js","directories":{"lib":""}});
});