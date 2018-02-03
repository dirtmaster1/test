var game = game ||{};
game.player = (function(){
    'use strict';
	
	var tmpQuaternion = new THREE.Quaternion();
    var ship = new game.PlayerShip();
	var camera = null;
	var gameObjectController = null;
	var moveForward = 0;
	
	function Init(scene, manager){
		gameObjectController = manager;
		
		camera = scene.getObjectByName('camera');
		scene.add(ship);
    }
	
	function Update(scene, delta, keyboard, mouse, gameObjects)
	{
		UpdateKeyboardInput(keyboard, delta, scene);
		UpdateMouseInput(scene, mouse, delta, gameObjects)
	
		ship.userData.target.Update(camera);
		ship.userData.speed = moveForward;
	}
	
	function UpdateMouseInput(scene,mouse, delta, gameObjects)
	{
		UpdateRotation(mouse, delta);
		UpdateTarget(scene, mouse, gameObjects);
		UpdateProjectiles(scene, mouse);
	}
	
	function UpdateProjectiles(scene, mouse)
	{
		if(mouse.mouseRightClick)
		{
			FireMissile(scene);
		}
	}
	
	function FireMissile(scene)
	{
		return "missle fired";
	}
	
	function Shoot(scene)
	{
		gameObjectController.AddProjectile(ship, "projectile_light_laser", scene);
	}
	
	function UpdateRotation(mouse, delta)
	{
		if(mouse.mouseDistanceX != 0 || mouse.mouseDistanceY != 0)
		{				
			tmpQuaternion.set( ((-mouse.mouseDistanceY/Math.abs(mouse.mouseDistanceY + .000001)) * delta * .4) 
									* mouse.mouseDistanceModifier, 
								((-mouse.mouseDistanceX/Math.abs(mouse.mouseDistanceX + .000001)) * delta * .4) 
									* mouse.mouseDistanceModifier,  
								0, 
								1 )
								.normalize();
			
			ship.quaternion.multiply(tmpQuaternion);
		}
	}
	
	function UpdateTarget(scene, mouse, gameObjects)
	{
		if(mouse.mouseClick)
		{
			var mousePickVector = mouse.mousePickVector;
			var camera = scene.getObjectByName('camera');

			var raycaster = new THREE.Raycaster();
			
			raycaster.setFromCamera( mousePickVector, camera );
		
			var models = [];
			
			gameObjects.forEach(function(gameObject){ 
			    
				models.push(gameObject.model);
			});			
			
			var intersects = raycaster.intersectObjects( models, true );

			if (intersects.length > 0)
			{
				if(intersects[0].object.parent.name != 'playerShip')
				{
					ship.userData.target.Set(intersects[0].object.parent);
				}
			}
		}
	}
	
	function UpdateKeyboardInput(keyboard, delta, scene)
	{
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
		
		if(keyboard.pressed("space"))
		{
			Shoot(scene);
		}
		
		ship.translateX(moveRight * delta * 50);
		ship.translateY(moveUp * delta * 50);
		ship.translateZ(moveForward * delta);
		
	}

    return{
        ship: ship,
        Init: Init,
		Update: Update
    }
})();


