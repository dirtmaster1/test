var game = game ||{};

game.controls = (function(){
    'use strict';

    function Update(delta, keyboard, playerShip){
        if(keyboard.pressed("W"))
        {
            playerShip.translateZ(-1);
        }
    }

    return{
        Update: Update
    }
})();
