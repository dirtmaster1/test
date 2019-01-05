var tbs = tbs ||{};

tbs.mapController = (function() {
    "use strict";

    function canUnitMoveToTile(direction, unit, tileSet)
    {
        if(direction == "up")
        {
            var newTile = tileSet.tiles[unit.position.y + 1][unit.position.x];
            
            if(unit.position.y + 1 > tileSet.max_rows - 1
                || !newTile.is_accessible)
            {
                return false;
            }
        }

        if(direction == "down")
        {
            var newTile = tileSet.tiles[unit.position.y + -1][unit.position.x];
            
            if(unit.position.y - 1 < 0
                || !newTile.is_accessible)
            {
                return false;
            }
        }

        if(direction == "right")
        {
            var newTile = tileSet.tiles[unit.position.y][unit.position.x + 1];
            
            if(unit.position.x + 1 > tileSet.max_rows - 1
                || !newTile.is_accessible)
            {
                return false;
            }
        }

        if(direction == "left")
        {
            var newTile = tileSet.tiles[unit.position.y][unit.position.x - 1];
            
            if(unit.position.x - 1 < 0
                || !newTile.is_accessible)
            {
                return false;
            }
        }

        return true;    
    }
    

    return {
        canUnitMoveToTile : canUnitMoveToTile
    }

})();    