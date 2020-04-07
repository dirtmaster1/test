var tbs = tbs ||{};

class Factory {

	constructor()
	{
		this.graphics = new Graphics();
	}

	initialize()
	{
		const loader = new THREE.TextureLoader();

		this.terrain_grass = new THREE.MeshBasicMaterial({
			map: loader.load('http://localhost:8000/images/terrain_grass.png'),
			side: THREE.DoubleSide,
		});

		this.terrain_mountain = new THREE.MeshBasicMaterial({
			map: loader.load('http://localhost:8000/images/terrain_mountain.png'),
			side: THREE.DoubleSide,
		});
	}

	createTileSet(maxColumns, maxRows, scene)
	{
		var tileWidth = 50;
		var tileHeight = 50;
		
		var tile_set_origin_x = 0;
		var tile_set_origin_y = 0;
		
		var tileSet = new TileSet(maxRows, maxColumns, tileWidth, tileHeight);
		
		var texture = null;

		for(var column = 0; column < maxColumns; column++)
		{
			tileSet.tiles[column] = new Array(maxRows);
			
			for(var row = 0; row < maxRows; row++)
			{
				var isAccessible = true;
				var random = Math.floor(Math.random() * 100)

				if(random < 30)
				{
					texture = this.terrain_mountain; 
					isAccessible = false;
				} 
				else
				{
					texture = this.terrain_grass;
				}

				var tile = new Tile(this.graphics.CreateBoxWithTexture(tileWidth, tileHeight, 1, texture), isAccessible)
				tile.position.x = column;
				tile.position.y = row;
				tile.model.position.set(tile_set_origin_x + (column * tileWidth),
								  tile_set_origin_y + (row * tileHeight),
									0);

				tileSet.tiles[column][row] = tile;
									
				scene.add(tile.model)	
			}
		}
		
        return tileSet;
	}

	createPlayer(name, scene, start_x, start_y)
	{
		var playerModel = this.graphics.createCircle(20, 100);
		playerModel.position.set(start_x, start_y, 1)
		
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