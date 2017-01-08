var game = game ||{};

game.controls = (function(){
    'use strict';
	
	function Update(delta, playerShip, keyboard, mouse){
        
		if(keyboard != null || keyboard != undefined)
		{
			UpdateKeyboardInput(playerShip, keyboard);
		}
		
		if(mouse != null || mouse != undefined)
		{
			playerShip.rotation.x += mouse.xRot;
			playerShip.rotation.y += mouse.yRot;
			
			mouse.xRot = 0;
			mouse.yRot = 0;
		}
    }
	
	
	function UpdateKeyboardInput(playerShip, keyboard)
	{
		if(keyboard.pressed("W"))
        {
            playerShip.translateZ(-1);
        }

        if(keyboard.pressed("S"))
        {
            playerShip.translateZ(1);
        }

        if(keyboard.pressed("D"))
        {
            playerShip.translateX(1);
        }

        if(keyboard.pressed("A"))
        {
            playerShip.translateX(-1);
        }

        if(keyboard.pressed("R"))
        {
            playerShip.translateY(1);
        }

        if(keyboard.pressed("F"))
        {
            playerShip.translateY(-1);
        }
	}

    return{
        Update: Update
    }
})();
