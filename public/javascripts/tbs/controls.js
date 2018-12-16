var tbs = tbs ||{};

tbs.controls = (function() {
    "use strict";

    var keyboard  = new THREEx.KeyboardState();
    var keyPressed = "";
    
    function move(unit, tileSet)
    {
        if(keyboard.pressed("w")) 
            {
                keyPressed = "w";
            }

		if(!keyboard.pressed("w") && keyPressed == "w")
            { 
                moveUnit("w", unit, tileSet, keyboard);
                keyPressed = "";
            }
    }

    function moveUnit(direction, unit, tileSet)
	{
		if(direction == "w")
		{
			unit.position.y += 1;

			var newTile = tileSet[unit.position.y][unit.position.x];
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