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
        scene.add(perspectiveCamera);
    }
	
	function Update(ship){
		
		var relativeCameraOffset = new THREE.Vector3(10,50,100);
		var cameraOffset = relativeCameraOffset.applyMatrix4(ship.matrixWorld);

		var cameraUp = new THREE.Vector3(0, 1, 0);
		var cameraUpMatrix = new THREE.Matrix4();
		var cameraUpRotMatrix = cameraUpMatrix.makeRotationFromQuaternion(ship.quaternion)

		perspectiveCamera.position.x = cameraOffset.x;
		perspectiveCamera.position.y = cameraOffset.y;
		perspectiveCamera.position.z = cameraOffset.z;
		perspectiveCamera.up = cameraUp.applyMatrix4(cameraUpRotMatrix);
		perspectiveCamera.lookAt(ship.position);
		perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
		perspectiveCamera.updateProjectionMatrix();		
    }

    return{
        Camera: perspectiveCamera,
        Init: Init,
		Update: Update
    }
})();
