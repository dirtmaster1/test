var game = game ||{};

game.camera = (function(){
    'use strict';

    var calculatedZoomAmount = 0;
	
	var perspectiveCamera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );
    perspectiveCamera.position.set(0,0,100);
    perspectiveCamera.up = new THREE.Vector3(0,1,0);
    perspectiveCamera.name = 'camera';

    function Init(scene){
        scene.add(perspectiveCamera);
    }
	
	function Update(ship, mouse){
		
		var isFollowingShip = true;
		if(!isFollowingShip)
		{	
		  return;	
		}
		
		var relativeCameraOffset = new THREE.Vector3(0,0,100 + CalculateZoomAmount(-mouse.mouseWheelDelta));
		
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
	
	function CalculateZoomAmount(zoomAmount)
	{
		var adjustedZoomAmount = (zoomAmount/120) * 20;
		
		calculatedZoomAmount += adjustedZoomAmount;
		
		return calculatedZoomAmount;
	}

    return{
        Camera: perspectiveCamera,
        Init: Init,
		Update: Update
    }
})();
