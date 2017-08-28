var game = game ||{};
game.player = (function(){
    'use strict';
	
	var tmpQuaternion = new THREE.Quaternion();
    var ship = new game.PlayerShip();
	
	function Init(scene){
		scene.add(ship);
    }
	
	function Update(scene, delta, keyboard, mouse, gameObjects)
	{
		UpdateKeyboardInput(keyboard, delta);
		UpdateMouseInput(scene, mouse, delta, gameObjects)
		
		ship.userData.target.Update();
	}
    
	function UpdateTarget(scene, mouse, gameObjects)
	{
		if(mouse.mouseClick)
		{
			var mousePickVector = mouse.mousePickVector;
			var camera = scene.getObjectByName('camera');

			var raycaster = new THREE.Raycaster();
			
			raycaster.setFromCamera( mousePickVector, camera );
		
			var intersects = raycaster.intersectObjects( gameObjects, true );

			if (intersects.length > 0)
			{
				ship.userData.target.Set(intersects[0].object.parent);
			}
		}
	}
	
	function UpdateMouseInput(scene,mouse, delta, gameObjects)
	{
		UpdateRotation(mouse, delta);
		UpdateTarget(scene, mouse, gameObjects);
	}
	
	function UpdateRotation(mouse, delta)
	{
		if(mouse.mouseDistanceX != 0 || mouse.mouseDistanceY != 0)
		{				
			tmpQuaternion.set( (-mouse.mouseDistanceY/Math.abs(mouse.mouseDistanceY + .000001)) * delta * .2, 
								(-mouse.mouseDistanceX/Math.abs(mouse.mouseDistanceX + .000001)) * delta * .2, 
								0, 
								1 )
								.normalize();
			
			
			ship.quaternion.multiply(tmpQuaternion);
		}
	}
	
	function UpdateKeyboardInput(keyboard, delta)
	{
		var moveForward = 0;
		var moveRight = 0;
		var moveUp = 0;
		
		if(keyboard.pressed("W"))
        {
            moveForward--;
        }

        if(keyboard.pressed("S"))
        {
            moveForward++;
        }

        if(keyboard.pressed("D"))
        {
            moveRight++;
        }

        if(keyboard.pressed("A"))
        {
            moveRight--;
        }

        if(keyboard.pressed("R"))
        {
            moveUp++;
        }

        if(keyboard.pressed("F"))
        {
            moveUp--;
        }
		
		ship.translateX(moveRight * delta * 50);
		ship.translateY(moveUp * delta * 50);
		ship.translateZ(moveForward * delta * 50);
		
	}

    return{
        ship: ship,
        Init: Init,
		Update: Update
    }
})();


