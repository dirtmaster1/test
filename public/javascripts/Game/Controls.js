var game = game ||{};

game.controls = (function(){
    'use strict';
	var tmpQuaternion1 = new THREE.Quaternion();
	
	
	function Update(delta, playerShip, keyboard, mouse, camera){
        
			var isFollowingShip = true;
				
			if(mouse.mouseDistanceX != 0 || mouse.mouseDistanceY != 0)
			{				
				tmpQuaternion1.set( (-mouse.mouseDistanceY/Math.abs(mouse.mouseDistanceY + .000001)) * delta * .6, 
									(-mouse.mouseDistanceX/Math.abs(mouse.mouseDistanceX + .000001)) * delta * .6, 
									0, 
									1 )
									.normalize();
									
				console.log('Y rotation speed: ' + (-mouse.mouseDistanceX * delta * .2) + ' mouse.mouseDistanceX: ' + -mouse.mouseDistanceX)	
				
				
				playerShip.quaternion.multiply(tmpQuaternion1);
				
				 if(Math.abs(playerShip.rotation.x) >= (Math.PI * 2))
				 {
					 playerShip.rotation.x = 0
				 }
				 
				 if(Math.abs(playerShip.rotation.y) >= (Math.PI * 2))
				 {
				 	 playerShip.rotation.y = 0
				 }
				
				mouse.mouseDistanceX = 0;
				mouse.mouseDistanceY = 0;
			}
			
			UpdateKeyboardInput(playerShip, keyboard, delta);
			
			if(isFollowingShip)
				{	
					camera.Update(playerShip);
				}
			
		}
    
	
	function UpdateKeyboardInput(playerShip, keyboard, delta)
	{
		var moveForward = 0;
		var moveRight = 0;
		var moveUp = 0;
		var rotateY = 0;
		var rotateX = 0;
		
		if(keyboard.pressed("Z"))
        {
            rotateY--;
			
        }

        if(keyboard.pressed("X"))
        {
            rotateY++;
        }
		
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
		
		playerShip.translateX(moveRight * delta * 50);
		playerShip.translateY(moveUp * delta * 50);
		playerShip.translateZ(moveForward * delta * 50);
		
	}

    return{
        Update: Update
    }
})();
