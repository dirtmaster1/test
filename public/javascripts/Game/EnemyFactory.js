var game = game ||{};

game.enemyFactory = (function(){
    'use strict';

	var graphics = game.graphics;
	var counter = 1;
	
	function Create(color, x, y, z)
	{	
		var model = graphics.CreateCone(6,18,5,color);
		model.name = 'enemy_ship_' + counter;
		model.rotation.order = 'YZX'
		model.position.set(x, y, z);
		
		counter++;
		
		return { "model": model, 
				 "owner" : "self",
				 "type" : "enemy_ship"}
	}
	
	return{
        Create: Create,
    }	
})();	