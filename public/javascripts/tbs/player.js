var tbs = tbs ||{};

tbs.player = (function() {
    "use strict";

    var controls = tbs.controls;
    var map = tbs.mapController;

    var _player = {};
    
    function init(player)
    {
        _player = player;
    }
    
    function update(tileSet)
	{
        var keyPressedDownThenUp = controls.whichKeyIsPressedDownThenUp(["w","s","a","d"]);

        if(keyPressedDownThenUp)
        {
            move(keyPressedDownThenUp, tileSet);
        }
    }

    function move(key, tileSet)
    {
        //up
        if(key == "w")
		{
            if(!map.canUnitMoveToTile("up", _player, tileSet))
            {
               return;
            }
            
            _player.position.y += 1;
        }
        
        //down
        if(key == "s")
		{
            if(map.canUnitMoveToTile("down", _player, tileSet))
            {
                return;
            }
            
            _player.position.y += -1;
        }
        
        //left
        if(key == "a")
		{
            if(map.canUnitMoveToTile("left", _player, tileSet))
            {
                return;
            }
            
            _player.position.x += -1;
        }
        
        //right
        if(key == "d")
		{
            if(map.canUnitMoveToTile("right", _player, tileSet))
            {
                return;
            }
            
            _player.position.x += -1;
        }
                
        setPlayerPositionAndTileState(newTile);
    }

    function setPlayerPositionAndTileState(tile)
    {
        tile.occupied_by = _player;

        _player.model.position.set(tile.model.position.x, 
            tile.model.position.y,
            tile.model.position.z + 1)
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