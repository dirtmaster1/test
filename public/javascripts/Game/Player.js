game.player = (function(){
    'use strict';

    var playerShip;

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

    playerShip = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 20, 4, 4), material);
    playerShip.name = 'playerShip';

    return{
        playerShip: playerShip
    }
})();
