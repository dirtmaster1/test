var tbs = tbs ||{};

tbs.factory = (function() {
    "use strict";

    var graphics = game.graphics;

	function createTileSet(maxColumns, maxRows, scene)
	{
		var tileWidth = 50;
		var tileHeight = 50;
		
		var tile_set_origin_x = 0;
		var tile_set_origin_y = 0;
		
		var tileSet = new TileSet(maxRows, maxColumns, tileWidth, tileHeight);
		
		var color = null;

		for(var row = 0; row < maxRows; row++)
		{
			tileSet.tiles[row] = new Array(maxColumns);
			
			for(var column = 0; column < maxColumns; column++)
			{
				var isAccessible = true;
				var random = Math.floor(Math.random() * 10) + 1

				if(random < 2)
				{
					color = tileSet.closedTileColor; 
					isAccessible = false;
				} 
				else
				{
					color = tileSet.openTileColor;
				}

				var tile = new Tile(graphics.CreateBox(color, tileWidth, tileHeight, 1), isAccessible)
				tile.position.x = column;
				tile.position.y = row;
				tile.model.position.set(tile_set_origin_x + (column * tileWidth),
								  tile_set_origin_y + (row * tileHeight),
									-10);

				tileSet.tiles[row][column] = tile;
									
				scene.add(tile.model)	
			}
		}
		
        return tileSet;
	}
	
	function createUnit(name, scene, tile)
	{
		var unitModel = graphics.createCircle(20, 100);
		unitModel.position.set(tile.model.position.x, 
							   tile.model.position.y,
							   tile.model.position.z + 1)
		
		scene.add(unitModel);

		var unit = {
			"model" : unitModel,
			"position" : {"x" : tile.position.x, "y" : tile.position.y},
			"name" : name
		}
        
		tile.occupied_by = unit;
		
		return unit; 
	}
    
    return {
        createUnit: createUnit,
        createTileSet: createTileSet
    }

})();    