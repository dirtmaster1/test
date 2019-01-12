var tbs = tbs ||{};
tbs.userInterface = (function ()
{
    "use strict";

    function update(player, mouse){
        
        document.querySelector('#position_world').innerHTML = 'world position: <br /> x = ' + player.model.position.x + 
																	', <br /> y = ' + player.model.position.y + 
																	', <br /> z = ' + player.model.position.z;
        document.querySelector('#position_tile').innerHTML = 'tile position : <br /> x = ' + player.position.x +
                                                                    ', <br /> y = ' + player.position.y;
                                                                    
        document.querySelector('#mouse').innerHTML = 'mouse coordinates : <br /> x = ' + mouse.mouseDownX +
																	', <br /> y = ' + mouse.mouseDownY;                                                                    
        }

    return{
        update: update
    }
})();
