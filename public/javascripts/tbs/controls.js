var tbs = tbs ||{};

tbs.controls = (function() {
    "use strict";

    var keyboard  = new THREEx.KeyboardState();
    var mouse = new game.Mouse();
    var keyPressed = "";
    var mappings = {
        "w" : "up",
        "s" : "down",
        "a" : "left",
        "d" : "right",
    };
    
    function playerMouseClicked()
    {
        return mouse.mouseClick;
    }

    function getPlayerClickPosition()
    {
        var offSetX = 212;
        var offSetY = 212;
        var x = null;
        var y = null;
        
        if(mouse.mouseDownX != 0 || mouse.mouseDownY != 0)
        {
            x = mouse.mouseDownX + offSetX;
            y = mouse.mouseDownY + offSetY;
        }

        return {
            x : x,
            y : y
        };
    }
    
    function getPlayerMoveDirection()
    {
        var keyPressedDownThenUp = whichKeyIsPressedDownThenUp(["w","s","a","d"]);

        if(keyPressedDownThenUp)
        {
            return mappings[keyPressedDownThenUp];
        }
    }

    function whichKeyIsPressedDownThenUp(keys)
    {
        var _temp_key = null;
        
        keys.forEach(key => {
            if(keyboard.pressed(key)) 
            {
                keyPressed = key;
            }

		if(!keyboard.pressed(key) && keyPressed == key)
            { 
                keyPressed = "";
                _temp_key = key;
            }    
        });

        return _temp_key;
    }

    return{
        getPlayerMoveDirection: getPlayerMoveDirection,
        getPlayerClickPosition: getPlayerClickPosition,
        playerMouseClicked: playerMouseClicked
    }
})();    