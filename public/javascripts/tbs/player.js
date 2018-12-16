var tbs = tbs ||{};

tbs.player = (function() {
    "use strict";

    var controls = tbs.controls;
    var _player = {};
    
    function init(player)
    {
        _player = player;
    }
    
    function update(tileSet)
	{
		controls.move(_player, tileSet);
    }
    
    function info()
    {
        return _player;
    }
	
    return{
        update: update,
        init: init,
        info: info
    }

})();    