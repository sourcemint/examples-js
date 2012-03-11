
define(function(require, exports, module)
{
    exports.main = function()
    {
        console.log(require("./greetings").getGreeting());
    }
});
