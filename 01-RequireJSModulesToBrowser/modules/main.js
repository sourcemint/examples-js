
define(["./greeting"], function(GREETING)
{
	return {
	    main: function()
        {
    		console.log(GREETING.getGreeting());
        }
	};
});
