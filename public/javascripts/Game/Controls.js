var game = game ||{};

game.controls = (function(){
    'use strict';

    function Update(delta){ var test = 1};

    function KeyDown(event, object){

        switch (event.keyCode) {
            case 83: /*W*/
                object.position.z -= 1;
                break;
        }
    };

    window.addEventListener('keydown', KeyDown, false);

    return{
        keyDown: KeyDown
    }
})();
