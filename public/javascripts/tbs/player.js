var tbs = tbs ||{};

tbs.player = (function() {
    "use strict";

    var controls = tbs.controls;
    var map = tbs.mapController;

    var _player = {};
    var _tileSet = {};
    var click_mouse_x = null;
    var click_mouse_y = null;
    var click_tile_x = null;
    var click_tile_y = null;
    
    function init(player)
    {
        _player = player;
    }
    
    function update(tileSet)
	{
        _tileSet = tileSet;
        
        setPlayerClickValues(tileSet);
        
        var direction = controls.getPlayerMoveDirection();
        
        if(direction)
        {
            move(direction);
        }
    }

    function setPlayerClickValues(tileSet)
    {
        var click = controls.getPlayerClickPosition();
        click_mouse_x = click.x;
        click_mouse_y = click.y;

        //click_tile_x = (click_mouse_x - (click_mouse_x % (tileSet.tileWidth/2)))/(tileSet.tileWidth/2);
        //click_tile_y = (click_mouse_y - (click_mouse_y % (tileSet.tileHeight/2)))/(tileSet.tileHeight/2);
        click_tile_x = getClickedTile(click_mouse_x, tileSet.tileWidth, tileSet.max_columns);
        click_tile_y = getClickedTile(click_mouse_y, tileSet.tileHeight, tileSet.max_rows);
    }

    function getClickedTile(mouse, length, maxCount)
    {
        var tileNumber = (mouse - (mouse % (length/2)))/(length/2);
        
        if(tileNumber > (maxCount-1) || tileNumber < 0)
        {
            return -1
        }

        return tileNumber;
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
            click_mouse_x : click_mouse_x,
            click_mouse_y : click_mouse_y,
            click_tile_x : click_tile_x,
            click_tile_y : click_tile_y
        };
    }
	
    return{
        update: update,
        init: init,
        info: info
    }

})();    