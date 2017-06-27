var game = game ||{};
game.player = (function(){
    'use strict';
	
	var graphics = game.graphics;
    var ship = graphics.CreateCone(6,18,5,0x156289);
	
	
	ship.name = 'playerShip';

    function Init(scene){
        scene.add(ship);
    }

    return{
        ship: ship,
        Init: Init
    }
})();


