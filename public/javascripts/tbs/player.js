var tbs = tbs ||{};

tbs.player = (function() {
    "use strict";

    var controls = tbs.controls;
    var map = tbs.mapController;

    var _player = {};
    var _tileSet = {};
    
    function init(player)
    {
        _player = player;
    }
    
    function update(tileSet)
	{
        _tileSet = tileSet;
        var direction = controls.getPlayerMoveDirection();
        
        if(direction)
        {
            move(direction);
        }
    }

    function move(direction)
    {
        var newTile = {};
        var playerMoved = false;
        
        if(direction == "up" && playerCanMove("up"))
		{
            _player.position.y += 1;
            playerMoved = true;
        }
        
        if(direction == "down" && playerCanMove("down"))
		{
            _player.position.y += -1;
            playerMoved = true;
        }
        
        if(direction == "left" && playerCanMove("left"))
		{
            _player.position.x += -1;
            playerMoved = true;
        }
        
        if(direction == "right" && playerCanMove("right"))
        {
            _player.position.x += 1;
            playerMoved = true;
        }
                
        if(playerMoved)
        {
            newTile = _tileSet.tiles[_player.position.y][_player.position.x];
            setPlayerPositionAndTileState(newTile);
        }
    }

    function playerCanMove(direction)
    {
        return map.canUnitMoveToTile(direction, _player, _tileSet);
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