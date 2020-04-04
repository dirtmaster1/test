var tbs = tbs ||{};

class Factory {

	constructor()
	{
		this.graphics = new Graphics();
	}

	createTileSet(maxColumns, maxRows, scene)
	{
		var tileWidth = 50;
		var tileHeight = 50;
		
		var tile_set_origin_x = 0;
		var tile_set_origin_y = 0;
		
		var tileSet = new TileSet(maxRows, maxColumns, tileWidth, tileHeight);
		
		var color = null;

		for(var column = 0; column < maxColumns; column++)
		{
			tileSet.tiles[column] = new Array(maxRows);
			
			for(var row = 0; row < maxRows; row++)
			{
				var isAccessible = true;
				var random = Math.floor(Math.random() * 100)

				if(random < 30)
				{
					color = tileSet.closedTileColor; 
					isAccessible = false;
				} 
				else
				{
					color = tileSet.openTileColor;
				}

				//var tile = new Tile(this.graphics.CreateBox(color, tileWidth, tileHeight, 1), isAccessible)
				var tile = new Tile(this.graphics.CreateBoxWithTexture(tileWidth, tileHeight, 1, "../assets/terrain_tiles.png"), isAccessible)
				tile.position.x = column;
				tile.position.y = row;
				tile.model.position.set(tile_set_origin_x + (column * tileWidth),
								  tile_set_origin_y + (row * tileHeight),
									-10);

				tileSet.tiles[column][row] = tile;
									
				scene.add(tile.model)	
			}
		}
		
        return tileSet;
	}

	createPlayer(name, scene, start_x, start_y)
	{
		var playerModel = this.graphics.createCircle(20, 100);
		playerModel.position.set(start_x, start_y, -9)
		
		scene.add(playerModel);

		var player = new Player(playerModel, {"x" : start_x, "y" : start_y}, name);

		return player; 
	}
	
	createUnit(name, scene, start_x, start_y)
	{
		var unitModel = this.graphics.createCircle(20, 100);
		unitModel.position.set(start_x, start_y, -9)
		
		scene.add(unitModel);

		var unit = {
			"model" : unitModel,
			"position" : {"x" : start_x, "y" : start_y},
			"name" : name
		}

		return unit; 
	}
};    