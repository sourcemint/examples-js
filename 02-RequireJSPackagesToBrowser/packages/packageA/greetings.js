
define(function(require, exports, module)
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
});
