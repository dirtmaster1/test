var tbs = tbs ||{};

tbs.player = (function() {
    "use strict";

    var controls = tbs.controls;
    var map = tbs.mapController;

    var _player = {};
    var _tileSet = {};
    var clickX = null;
    var clickY = null;
    
    function init(player)
    {
        _player = player;
    }
    
    function update(tileSet)
	{
        _tileSet = tileSet;
        var direction = controls.getPlayerMoveDirection();
        
        var click = controls.getPlayerClickPosition();
        clickX = click.x;
        clickY = click.y;
        
        if(direction)
        {
            move(direction);
        }
    }

    function move(direction)
    {
        var newTile = {};
        var playerMoved = false;
        
        if(direction == "up" && canMove("up"))
		{
            _player.position.y += 1;
            playerMoved = true;
        }
        
        if(direction == "down" && canMove("down"))
		{
            _player.position.y += -1;
            playerMoved = true;
        }
        
        if(direction == "left" && canMove("left"))
		{
            _player.position.x += -1;
            playerMoved = true;
        }
        
        if(direction == "right" && canMove("right"))
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

    function canMove(direction)
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
        return { player : _player,
            clickX : clickX,
            clickY : clickY
        };
    }
	
    return{
        update: update,
        init: init,
        info: info
    }

})();    