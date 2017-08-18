var game = game ||{};
game.player = (function(){
    'use strict';
	
	var graphics = game.graphics;
	
    var ship = graphics.CreateCone(6,18,5,0x156289);
	//var ship = graphics.CreateBox(10,20,10,0x156289);
    
	var axisHelper = new THREE.AxisHelper( 25 );
	ship.add( axisHelper );
	
	ship.name = 'playerShip';
	ship.rotation.order = 'YZX'

    function Init(scene){
        scene.add(ship);
    }

    return{
        ship: ship,
        Init: Init
    }
})();


