var game = game ||{};
game.player = (function(){
    'use strict';

    var material = new THREE.MeshPhongMaterial({
        color: 0x0088aa,
        ambient: 0x0088aa,
        specular: 0x003344,
        shininess: 100,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
    });

	var ship = new THREE.Mesh(new THREE.ConeGeometry( 6, 15, 8 ), material);

	ship.name = 'playerShip';

    function Init(scene){
        scene.add(ship);
    }

    return{
        ship: ship,
        Init: Init
    }
})();


