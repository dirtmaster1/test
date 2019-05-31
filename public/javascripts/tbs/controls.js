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
    
    function getPlayerClickPosition()
    {
        var x = mouse.mouseDownX + 225;
        var y = mouse.mouseDownY + 225;

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
    
    function isKeyPressedDownThenUp(key)
    {
        if(keyboard.pressed(key)) 
            {
                keyPressed = key;
            }

		if(!keyboard.pressed(key) && keyPressed == key)
            { 
                keyPressed = "";
                return true;
            }
            
        return false;    
    }

    function whichKeyIsPressedDownThenUp(keys)
    {
        var _key = null;
        
        keys.forEach(key => {
            if(keyboard.pressed(key)) 
            {
                keyPressed = key;
            }

		if(!keyboard.pressed(key) && keyPressed == key)
            { 
                keyPressed = "";
                _key = key;
            }    
        });

        return _key;
    }

    return{
        getPlayerMoveDirection: getPlayerMoveDirection,
        getPlayerClickPosition: getPlayerClickPosition
    }
})();    