var game = game ||{};

game.enemy = (function(){
    'use strict';

	var graphics = game.graphics;
	var counter = 1;
	
	function Create(scene, color)
	{	
		var enemy = graphics.CreateCone(6,18,5,color);
		enemy.name = 'enemy_' + counter;
		enemy.rotation.order = 'YZX'
		enemy.userData.projectileList = [];
		scene.add(enemy);
		
		counter++;
		return enemy;
	}
	
	return{
        Create: Create,
    }	
})();	