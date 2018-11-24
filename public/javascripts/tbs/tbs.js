var tbs = tbs ||{};

tbs.run = (function() {
    "use strict";
    var renderer = new THREE.WebGLRenderer();
    
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
		createGrid(scene);
    }

    function render() {
        var delta = clock.getDelta();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
	
	function createGrid(scene)
	{
		var grid = [
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		];
		
		var maxColumns = 10;
		var maxRows = 10;
		
		var tileWidth = 100;
		var tileHeight = 100;
		
		var grid_origin_x = -400;
		var grid_origin_y = -400;
		
		for(var row = 0; row < maxRows; row++)
		{
			for(var column = 0; column < maxColumns; column++)
			{
				var color = 0xff0000;
			
				if((row + column)%2 == 0)
				{
					color = 0x00ff00
				}
				
				var tile = createTile(color, tileWidth, tileHeight);
				grid[row][column] = tile;
				
				tile.position.set(grid_origin_x + (column * tileWidth),
								  grid_origin_y + (row * tileHeight),
									-10);
				scene.add(tile)	
			}
		}
	}
	
	function createTile(color, width, height)
	{
		return graphics.CreateBox(color, width, height, 1);
	}
	
})();