var game = game ||{};

game.Mouse = function(){
	'use strict';
	
	// create callback to bind/unbind keyboard events
    var self	= this;
    this._onKeyDown	= function(event){ self._onKeyChange(event, true); };
    this._onKeyUp	= function(event){ self._onKeyChange(event, false);};

    // bind keyEvents
    document.addEventListener("keydown", this._onKeyDown, false);
    document.addEventListener("keyup", this._onKeyUp, false);
}