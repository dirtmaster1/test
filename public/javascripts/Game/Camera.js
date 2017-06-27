var game = game ||{};

game.camera = (function(){
    'use strict';

    var perspectiveCamera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    perspectiveCamera.position.set(0,0,100);
    perspectiveCamera.up = new THREE.Vector3(0,1,0);
    perspectiveCamera.name = 'camera';

    function Init(scene){
        perspectiveCamera.lookAt(scene.getObjectByName('playerShip').position);
        scene.add(perspectiveCamera);
    }

    return{
        perspective: perspectiveCamera,
        Init: Init
    }
})();
