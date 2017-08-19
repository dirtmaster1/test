var game = game ||{};

game.Mouse = function(){
	
	var self = this;
	this.mouseDistanceX = 0;
	this.mouseDistanceY = 0;
	this.mouseMoveX = 0;
	this.mouseMoveY = 0;
	this.mouseDownX = 0;
	this.mouseDownY = 0;
	this.mouseWheelDelta = 0;
	this.mouseClick = false;
    //this.onMouseMove	= function(event){ self.MouseRotate(event, self); };
	this.mouseDownEventBind = function(event){ self.MouseDown(event, self); };
	this.mouseMoveEventBind = function(event){ self.MouseMove(event, self); };
	this.mouseUpEventBind = function(event){ self.MouseUp(event, self); };
	this.mouseOutEventBind = function(event){ self.MouseOut(event, self); };
	this.mouseWheelEventBind = function(event){ self.MouseWheel(event, self); };
	this.mouseClickEventBind = function(event){ self.MouseClick(event, self); };
	this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
	
    // bind keyEvents
    document.addEventListener('mousedown', self.mouseDownEventBind, false);
	document.addEventListener('mousewheel', self.mouseWheelEventBind, false);
	document.addEventListener('mouseclick', self.mouseClickEventBind, false);
	//document.addEventListener("mousemove", self.onMouseMove, false);
}

game.Mouse.prototype.MouseClick = function( event, scope ) {

        event.preventDefault();

		scope.mouseClick = true;
}

game.Mouse.prototype.MouseWheel = function( event, scope ) {

        event.preventDefault();

		scope.mouseWheelDelta = event.wheelDelta;
}

game.Mouse.prototype.MouseDown = function( event, scope ) {

        event.preventDefault();

        document.addEventListener( 'mousemove', scope.mouseMoveEventBind, false );
        document.addEventListener( 'mouseup', scope.mouseUpEventBind, false );
        document.addEventListener( 'mouseout', scope.mouseOutEventBind, false );
		
		scope.mouseDownX = event.clientX - scope.windowHalfX;
		scope.mouseDownY = event.clientY - scope.windowHalfY;
       
}

game.Mouse.prototype.MouseMove = function( event, scope ) {
		
		scope.mouseDistanceX = (event.clientX - scope.windowHalfX) - scope.mouseDownX;
		scope.mouseDistanceY = (event.clientY - scope.windowHalfY) - scope.mouseDownY; 
		
		scope.mouseDownX = event.clientX - scope.windowHalfX;
		scope.mouseDownY = event.clientY - scope.windowHalfY;
		
}

game.Mouse.prototype.MouseUp = function( event, scope ) {

        document.removeEventListener( 'mousemove', scope.mouseMoveEventBind, false );
        document.removeEventListener( 'mouseup', scope.mouseUpEventBind, false );
        document.removeEventListener( 'mouseout', scope.mouseOutEventBind, false );

}

game.Mouse.prototype.MouseOut = function( event, scope ) {

        document.removeEventListener( 'mousemove', scope.mouseMoveEventBind, false );
        document.removeEventListener( 'mouseup', scope.mouseUpEventBind, false );
        document.removeEventListener( 'mouseout', scope.mouseOutEventBind, false );

}


game.Mouse.prototype.MouseRotate = function(event, scope) {
        
        event.preventDefault();
		scope.xRot = 0;
		scope.yRot = 0;
		
		var deltaX = event.clientX - scope.mouseMoveX,
            deltaY = event.clientY - scope.mouseMoveY;
			
		scope.mouseMoveX = event.clientX;
        scope.mouseMoveY = event.clientY;	
			
         scope.mouseDistanceY = (deltaX / 100) * 1;
		 scope.mouseDistanceX = (deltaY / 100) * 1;
		 
		 if(scope.mouseDistanceX == null || scope.mouseDistanceX == undefined)
		 {
			 scope.mouseDistanceX = 0;
		 }
		 
		 if(scope.mouseDistanceY == null || scope.mouseDistanceY == undefined)
		 {
			 scope.mouseDistanceY = 0;
		 }
    }

