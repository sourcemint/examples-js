
define(function(require, exports, module)
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
});
