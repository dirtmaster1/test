var tbs = tbs ||{};

tbs.run = (function() {
    "use strict";
    var renderer = new THREE.WebGLRenderer();
    
	var keyboard  = new THREEx.KeyboardState();
	var mouse = new game.Mouse();
	var clock = new THREE.Clock();
	var graphics = game.graphics;
	var scene = new THREE.Scene();
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var camera = new THREE.OrthographicCamera( -width, width, height, -height, 1, 1000 );
    
    initialize();
    render();

    function initialize() {
        renderer.setSize(width, height);
        document.getElementById("container").appendChild(renderer.domElement);
		
		scene.add(camera);
		createTileSet(scene);
    }

    function render() {
        var delta = clock.getDelta();
		
		updateGrid(scene, keyboard);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
	
	function updateGrid(scene, keyboard)
	{
		
	}
	
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
		
		var startTile = tileSet[0][0];
		
		addUnit(scene, startTile);
	}
	
	function addUnit(scene, tile)
	{
		var unitModel = graphics.createCircle();
		unitModel.position.set(tile.model.position.x, 
							   tile.model.position.y,
							   tile.model.position.z + 1)
		
		scene.add(unitModel);
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