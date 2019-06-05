var tbs = tbs ||{};

tbs.factory = (function() {
    "use strict";

    var graphics = game.graphics;

    function createTileSetOld(scene)
	{
        var tileSet = {
            "tiles" : {},
            "max_rows" : 10,
            "max_columns" : 10
        };
        
        var tiles = [
			[0,0,0,0,0,0,0,0,0,0],
			[0,1,1,1,0,0,1,1,1,0],
			[0,1,0,0,0,0,0,0,1,0],
			[0,1,0,1,1,1,1,0,1,0],
			[0,1,0,1,0,0,0,0,1,0],
			[0,1,0,0,0,0,1,0,1,0],
			[0,1,0,1,1,1,1,0,1,0],
			[0,1,0,0,0,0,0,0,1,0],
			[0,1,1,0,0,0,0,1,1,0],
			[0,0,0,0,0,0,0,0,0,0]
		];
		
		var maxColumns = 10;
		var maxRows = 10;
		
		var tileWidth = 100;
		var tileHeight = 100;
		
		var tile_set_origin_x = 0;
		var tile_set_origin_y = 0;
		
		var color = 0xffffff;
		
		for(var row = 0; row < maxRows; row++)
		{
			for(var column = 0; column < maxColumns; column++)
			{
				var isAccessible = true;
				
				if(tiles[row][column] == 0)
				{
					color = 0x00ff00; //green
				}
			
				if(tiles[row][column] == 1)
				{
					color = 0xff0000; //red
					isAccessible = false;
				}
				
				var tile = createTile(color, tileWidth, tileHeight, isAccessible);
				tile.position.x = column;
				tile.position.y = row;
				
				tiles[row][column] = tile;
				
				tile.model.position.set(tile_set_origin_x + (column * tileWidth),
								  tile_set_origin_y + (row * tileHeight),
									-10);
									
				scene.add(tile.model)	
			}
		}
		
        tileSet.tiles = tiles;
		return tileSet;
	}

	function createTileSet(maxColumns, maxRows, scene)
	{
		var tileWidth = 50;
		var tileHeight = 50;
		
		var tile_set_origin_x = 0;
		var tile_set_origin_y = 0;
		
		var tileSet = {
            "tiles" : new Array(maxRows),
            "max_rows" : maxColumns,
			"max_columns" : maxRows,
			"tileWidth" : tileWidth,
			"tileHeight" : tileHeight
		};
		
		var color = 0xffffff;

		for(var row = 0; row < maxRows; row++)
		{
			tileSet.tiles[row] = new Array(maxColumns);
			
			for(var column = 0; column < maxColumns; column++)
			{
				var isAccessible = true;
				var random = Math.floor(Math.random() * 10) + 1

				if(random < 2)
				{
					color = 0xff0000; //red
					isAccessible = false;
				} 
				else
				{
					color = 0x00ff00; //green
				}

				var tile = createTile(color, tileWidth, tileHeight, isAccessible);
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
	
	function createTile(color, width, height, isAccessible)
	{
		var model3d = graphics.CreateBox(color, width, height, 1);
		
		return {
			"model" : model3d,
			"position" : {"x" : 0, "y" : 0},
			"occupied_by" : null,
			"is_accessible" : isAccessible
		}
    }
    
    return {
        createTile: createTile,
        createUnit: createUnit,
        createTileSet: createTileSet
    }

})();    