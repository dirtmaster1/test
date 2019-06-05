var tbs = tbs ||{};
tbs.userInterface = (function ()
{
    "use strict";

    function update(info, mouse){
        
        document.querySelector('#position_world').innerHTML = 'world position: <br /> x = ' + info.player.model.position.x + 
																	', <br /> y = ' + info.player.model.position.y + 
																	', <br /> z = ' + info.player.model.position.z;
        document.querySelector('#position_tile').innerHTML = 'tile position : <br /> x = ' + info.player.position.x +
                                                                    ', <br /> y = ' + info.player.position.y;
                                                                    
        document.querySelector('#mouse_transformed').innerHTML = 'mouse transformed coordinates : <br /> x = ' + mouse.mouseDownX +
                                                                    ', <br /> y = ' + mouse.mouseDownY;  
                                                                    
        document.querySelector('#mouse_event_client').innerHTML = 'mouse event client coordinates : <br /> x = ' + mouse.eventX +
                                                                    ', <br /> y = ' + mouse.eventY;
                                                                    
        document.querySelector('#player_click_mouse').innerHTML = 'player click mouse coords: <br /> x = ' + info.click_mouse_x +
                                                                    ', <br /> y = ' + info.click_mouse_y;
                                                                    
        document.querySelector('#player_click_tile').innerHTML = 'player click tile coords: <br /> x = ' + info.click_tile_x +
																	', <br /> y = ' + info.click_tile_y;                                                                                                                                        
        }

    return{
        update: update
    }
})();
