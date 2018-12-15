var tbs = tbs ||{};

tbs.run = (function() {
    "use strict";
    var renderer = new THREE.WebGLRenderer();
    
	var keyboard  = new THREEx.KeyboardState();
	var mouse = new game.Mouse();
	var clock = new THREE.Clock();
	var ui = tbs.userInterface;
	var graphics = game.graphics;
	var scene = new THREE.Scene();
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var camera = new THREE.OrthographicCamera( -width, width, height, -height, 1, 1000 );

	var tileSet = {};
	var player = {};
	
    initialize();
    render();

    function initialize() {
        renderer.setSize(width, height);
        document.getElementById("container").appendChild(renderer.domElement);
		
		scene.add(camera);

		tileSet = createTileSet(scene);

		var startTile = tileSet[0][0];
		
		player = createUnit("player", scene, startTile);
    }

    function render() {
		var delta = clock.getDelta();

		updatePlayer(player, tileSet, keyboard);
		ui.Update(player);

		renderer.render(scene, camera);
        requestAnimationFrame(render);
	}

	var keyPressed = "";
	// Update Entities
	function updatePlayer(player, tileSet, keyboard)
	{
		if(keyboard.pressed("w")) 
        {
			keyPressed = "w";
		}

		if(!keyboard.pressed("w") && keyPressed == "w")
		{ 
			moveUnit("w", player, tileSet, keyboard);
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

	// Create Entities
	function createTileSet(scene)
	{
		var tileSet = [
			[0,0,0,0,0,0,0,0,0,0],
			[0,1,1,1,1,1,1,1,1,0],
			[0,1,0,0,0,0,0,0,1,0],
			[0,1,0,1,1,1,1,0,1,0],
			[0,1,0,1,0,0,1,0,1,0],
			[0,1,0,1,0,0,1,0,1,0],
			[0,1,0,1,1,1,1,0,1,0],
			[0,1,0,0,0,0,0,0,1,0],
			[0,1,1,1,1,1,1,1,1,0],
			[0,0,0,0,0,0,0,0,0,0]
		];
		
		var maxColumns = 10;
		var maxRows = 10;
		
		var tileWidth = 100;
		var tileHeight = 100;
		
		var tile_set_origin_x = -400;
		var tile_set_origin_y = -400;
		
		var color = 0xffffff;;
		
		for(var row = 0; row < maxRows; row++)
		{
			for(var column = 0; column < maxColumns; column++)
			{
				if(tileSet[row][column] == 0)
				{
					color = 0xff0000; //red
				}
			
				if(tileSet[row][column] == 1)
				{
					color = 0x00ff00; //green
				}
				
				var tile = createTile(color, tileWidth, tileHeight);
				tile.position.x = column;
				tile.position.y = row;
				
				tileSet[row][column] = tile;
				
				tile.model.position.set(tile_set_origin_x + (column * tileWidth),
								  tile_set_origin_y + (row * tileHeight),
									-10);
									
				scene.add(tile.model)	
			}
		}

		return tileSet;
	}
	
	function createUnit(name, scene, tile)
	{
		var unitModel = graphics.createCircle();
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
	
	function createTile(color, width, height)
	{
		var model3d = graphics.CreateBox(color, width, height, 1);
		
		return {
			"model" : model3d,
			"position" : {"x" : 0, "y" : 0},
			"occupied_by" : null
		}
	}
	
})();