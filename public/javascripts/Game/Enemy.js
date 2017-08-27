var game = game ||{};

game.enemy = (function(){
    'use strict';

	var graphics = game.graphics;
	var enemy = graphics.CreateCone(6,18,5,0xC0C0C0);
	enemy.name = 'enemy_1';
	enemy.rotation.order = 'YZX'
	
	function Init(scene){
        scene.add(enemy);
    }
	
	return{
        Init: Init
    }	
})();	