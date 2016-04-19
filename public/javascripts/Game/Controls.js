var game = game ||{};

game.controls = (function(){
    'use strict';

    function Update(delta, keyboard, playerShip){
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
