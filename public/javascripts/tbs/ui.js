var tbs = tbs ||{};
tbs.userInterface = (function ()
{
    "use strict";

    function Update(player){
        
        document.querySelector('#position_world').innerHTML = 'world position: <br /> x = ' + player.model.position.x + 
																	', <br /> y = ' + player.model.position.y + 
																	', <br /> z = ' + player.model.position.z;
        document.querySelector('#position_tile').innerHTML = 'tile position : <br /> x = ' + player.position.x +
																	', <br /> y = ' + player.position.y;
        }

    return{
        Update: Update
    }
})();
