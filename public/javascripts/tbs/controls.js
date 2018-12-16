var tbs = tbs ||{};

tbs.controls = (function() {
    "use strict";

    var keyboard  = new THREEx.KeyboardState();
    var keyPressed = "";
    
    function move(unit, tileSet)
    {
        // move up
        keyPressDownThenUp("w", unit, tileSet)

        //move down
        keyPressDownThenUp("s", unit, tileSet)

        // move left
        keyPressDownThenUp("a", unit, tileSet)

        //move right
        keyPressDownThenUp("d", unit, tileSet)
    }

    function keyPressDownThenUp(key, unit, tileSet)
    {
        if(keyboard.pressed(key)) 
            {
                keyPressed = key;
            }

		if(!keyboard.pressed(key) && keyPressed == key)
            { 
                moveUnit(key, unit, tileSet, keyboard);
                keyPressed = "";
            }  
    }

    function moveUnit(key, unit, tileSet)
	{
        //up
        if(key == "w")
		{
            unit.position.y += 1;
            
            if(unit.position.y >= tileSet.max_rows)
            {
                unit.position.y = tileSet.max_rows - 1;
                return;
            }

			var newTile = tileSet.tiles[unit.position.y][unit.position.x];
			newTile.occupied_by = unit;

			unit.model.position.set(newTile.model.position.x, 
									  newTile.model.position.y,
									  newTile.model.position.z + 1)
        }
        
        //down
        if(key == "s")
		{
            unit.position.y -= 1;
            
            if(unit.position.y < 0)
            {
                unit.position.y = 0;
                return;
            }

			var newTile = tileSet.tiles[unit.position.y][unit.position.x];
			newTile.occupied_by = unit;

			unit.model.position.set(newTile.model.position.x, 
									  newTile.model.position.y,
									  newTile.model.position.z + 1)
        }
        
        //left
        if(key == "a")
		{
            unit.position.x -= 1;
            
            if(unit.position.x < 0)
            {
                unit.position.x = 0;
                return;
            }

			var newTile = tileSet.tiles[unit.position.y][unit.position.x];
			newTile.occupied_by = unit;

			unit.model.position.set(newTile.model.position.x, 
									  newTile.model.position.y,
									  newTile.model.position.z + 1)
        }
        
        //right
        if(key == "d")
		{
            unit.position.x += 1;
            
            if(unit.position.x >= tileSet.max_columns)
            {
                unit.position.x = tileSet.max_columns - 1;
                return;
            }

			var newTile = tileSet.tiles[unit.position.y][unit.position.x];
			newTile.occupied_by = unit;

			unit.model.position.set(newTile.model.position.x, 
									  newTile.model.position.y,
									  newTile.model.position.z + 1)
		}
    }
    
    return{
        move: move
    }
})();    