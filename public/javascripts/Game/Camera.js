var game = game ||{};

game.camera = (function(){
    'use strict';

    var isFollowingShip = false;
	
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
	
	function Update(scene, ship){
		
		if(isFollowingShip)
		{
			var relativeCameraOffset = new THREE.Vector3(0,50,100);

			var cameraOffset = relativeCameraOffset.applyMatrix4(ship.matrixWorld);

			perspectiveCamera.position.x = cameraOffset.x;
			perspectiveCamera.position.y = cameraOffset.y;
			perspectiveCamera.position.z = cameraOffset.z;
			perspectiveCamera.lookAt( ship.position );							   
		}
    }

    return{
        perspective: perspectiveCamera,
        Init: Init,
		Update: Update
    }
})();
