var game = game ||{};

game.Mouse = function(){
	
	var self	= this;
	this.xRot = 0;
	this.yRot = 0;
	this.mouseX = 0;
	this.mouseY = 0;
    this.onMouseMove	= function(event){ self.MouseRotate(event, self); };
	
    // bind keyEvents
    document.addEventListener("mousemove", self.onMouseMove, false);
}

game.Mouse.prototype.MouseRotate = function(evt, scope) {
        
        evt.preventDefault();
		scope.xRot = 0;
		scope.yRot = 0;
		
		var deltaX = evt.clientX - scope.mouseX,
            deltaY = evt.clientY - scope.mouseY;
			
		mouseX = evt.clientX;
        mouseY = evt.clientY;	
			
         scope.xRot = (deltaX / 100) * .02;
		 scope.yRot = (deltaY / 100) * .02;
		 
		 if(scope.xRot == null || scope.xRot == undefined)
		 {
			 scope.xRot = 0;
		 }
		 
		 if(scope.yRot == null || scope.yRot == undefined)
		 {
			 scope.yRot = 0;
		 }
    }

