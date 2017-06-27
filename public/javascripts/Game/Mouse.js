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
			
		scope.mouseX = evt.clientX;
        scope.mouseY = evt.clientY;	
			
         scope.yRot = (deltaX / 100) * 1;
		 scope.xRot = (deltaY / 100) * 3;
		 
		 if(scope.xRot == null || scope.xRot == undefined)
		 {
			 scope.xRot = 0;
		 }
		 
		 if(scope.yRot == null || scope.yRot == undefined)
		 {
			 scope.yRot = 0;
		 }
    }

