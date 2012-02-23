
define(function(require, exports, module)
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
});
