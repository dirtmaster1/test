var tbs = tbs ||{};

tbs.mapController = (function() {
    "use strict";

    function canUnitMoveToTile(direction, unit, tileSet)
    {
        var newTile = {};

        if(direction == "up")
        {
            if(unit.position.y + 1 <= tileSet.max_rows - 1)
            {
                var newTile = tileSet.tiles[unit.position.y + 1][unit.position.x];

                if(newTile.is_accessible)
                {
                    return true;
                }
            }
        }

        if(direction == "down")
        {
            
            if(unit.position.y - 1 >= 0)
            {
                var newTile = tileSet.tiles[unit.position.y + -1][unit.position.x];
            
                if(newTile.is_accessible)
                {
                    return true;
                }
            }
        }

        if(direction == "right")
        {
            if(unit.position.x + 1 <= tileSet.max_rows - 1)
            {
                var newTile = tileSet.tiles[unit.position.y][unit.position.x + 1];
            
                if(newTile.is_accessible)
                {
                    return true;
                }
            }
        }

        if(direction == "left")
        {
            if(unit.position.x - 1 >= 0)
            {
                var newTile = tileSet.tiles[unit.position.y][unit.position.x - 1];
            
                if(newTile.is_accessible)
                {
                    return true;
                }
            }
        }

        return false;    
    }
    

    return {
        canUnitMoveToTile : canUnitMoveToTile
    }

})();    