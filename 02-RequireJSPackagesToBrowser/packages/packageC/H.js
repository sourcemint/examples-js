
define(function(require, exports, module)
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
});
