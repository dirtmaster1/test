var game = game ||{};

game.PlayerShip = function(){
    'use strict';
	
	var graphics = new Graphics();
	var ship = graphics.CreateCone(6,18,5,0x156289);
	var axisHelper = new THREE.AxisHelper( 25 );
	
	ship.add( axisHelper );
	ship.name = 'playerShip';
	ship.rotation.order = 'YZX'
	ship.userData.target = new game.Target(ship);
	ship.userData.speed = 0;
	
	return ship;
};


