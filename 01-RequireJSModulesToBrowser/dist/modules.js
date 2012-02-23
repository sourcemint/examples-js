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
    require.memoize("/main.js", define('',["./greeting"], function(GREETING)
    {
    	return {
    	    main: function()
            {
        		console.log(GREETING.getGreeting());
            }
    	};
    }));
    require.memoize("/greeting.js", define('',['require','exports','module'],function(require, exports, module)
    {
    	exports.getGreeting = function()
        {
    	    return "Hello from 01-RequireJSModulesToBrowser!";
        }
    }));
    require.memoize("/package.json", {"main":"/main.js","directories":{"lib":""},"mappings":{}});
});