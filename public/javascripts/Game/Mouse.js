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
	this.mouseRightClick = false;
	this.mousePickVector = new THREE.Vector2();
	this.mouseDownEventBind = function(event){ self.MouseDown(event, self); };
	this.mouseMoveEventBind = function(event){ self.MouseMove(event, self); };
	this.mouseUpEventBind = function(event){ self.MouseUp(event, self); };
	this.mouseOutEventBind = function(event){ self.MouseOut(event, self); };
	this.mouseWheelEventBind = function(event){ self.MouseWheel(event, self); };
	this.mouseClickEventBind = function(event){ self.MouseClick(event, self); };
	this.mouseRightClickEventBind = function(event){ self.MouseRightClick(event, self); };
	this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
	
    document.addEventListener('mousedown', self.mouseDownEventBind, false);
	document.addEventListener('mousewheel', self.mouseWheelEventBind, false);
	document.addEventListener('click', self.mouseClickEventBind, false);
	document.addEventListener('contextmenu', self.mouseRightClickEventBind, false);
}

game.Mouse.prototype.MouseRightClick = function(event, scope)
{
	event.preventDefault();
	//event.stopPropagation();
	
	if(event.button == 2)
	{
		scope.mouseRightClick = true;
	}
}

game.Mouse.prototype.MouseClick = function( event, scope ) {

    event.preventDefault();

	if(event.button == 0)
	{
		scope.mouseClick = true;
		scope.MousePick(event, scope);
	}
}

game.Mouse.prototype.MouseWheel = function( event, scope ) {

        event.preventDefault();

		scope.mouseWheelDelta = event.wheelDelta;
}

game.Mouse.prototype.MouseDown = function( event, scope ) {

        event.preventDefault();

        if(event.button == 0)
		{
			document.addEventListener( 'mousemove', scope.mouseMoveEventBind, false );
			document.addEventListener( 'mouseup', scope.mouseUpEventBind, false );
			document.addEventListener( 'mouseout', scope.mouseOutEventBind, false );
			
			scope.mouseDownX = event.clientX - scope.windowHalfX;
			scope.mouseDownY = event.clientY - scope.windowHalfY;
		}	
       
}

game.Mouse.prototype.MouseMove = function( event, scope ) {
	
		scope.mouseDistanceX = (event.clientX - scope.windowHalfX) - scope.mouseDownX;
		scope.mouseDistanceY = (event.clientY - scope.windowHalfY) - scope.mouseDownY; 
		
		scope.mouseDownX = event.clientX - scope.windowHalfX;
		scope.mouseDownY = event.clientY - scope.windowHalfY;
		
}

game.Mouse.prototype.MouseUp = function( event, scope ) {
		
		if(event.button == 0)
		{
			scope.mouseDistanceX = 0;
			scope.mouseDistanceY = 0;
			
			document.removeEventListener( 'mousemove', scope.mouseMoveEventBind, false );
			document.removeEventListener( 'mouseup', scope.mouseUpEventBind, false );
			document.removeEventListener( 'mouseout', scope.mouseOutEventBind, false );
		}
}

game.Mouse.prototype.MouseOut = function( event, scope ) {

        document.removeEventListener( 'mousemove', scope.mouseMoveEventBind, false );
        document.removeEventListener( 'mouseup', scope.mouseUpEventBind, false );
        document.removeEventListener( 'mouseout', scope.mouseOutEventBind, false );

}

game.Mouse.prototype.MousePick = function ( event, scope ) {
    
    scope.mousePickVector.x = 2 * (event.clientX / window.innerWidth) - 1;
    scope.mousePickVector.y = 1 - 2 * (event.clientY / window.innerHeight);
}


