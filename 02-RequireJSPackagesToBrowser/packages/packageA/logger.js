
define(function(require, exports, module)
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
});
