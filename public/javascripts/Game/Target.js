var game = game ||{};

game.Target = function(targeter){
    'use strict';
	
	this.graphics = game.graphics;
	this.targeter = targeter;
	this.targetModel = 'None';
	this.name = '';
	this.distance = null;
	this.targetCircle = null;
	
	this.isObject3d = function(object)
	{
		return (object.type !== 'undefined' && object.type == 'Object3D');
	}
	
	this.findElement = function (arr, propName, propValue) {
	  for (var i=0; i < arr.length; i++)
		if (arr[i][propName] == propValue)
		  return arr[i];
	  
	  return false;
	}
};

game.Target.prototype.Remove = function(){
	
				var index = this.targetModel.children.indexOf(this.targetCircle);
				this.targetModel.children.splice(index, 1);
				this.targetModel = 'None';
				this.name = '';
				this.distance = null;
};	

game.Target.prototype.Set = function(target){
	
	if(this.isObject3d(target))
		{
			if((this.targetModel !== target) && this.isObject3d(this.targetModel))
			{
				var index = this.targetModel.children.indexOf(this.targetCircle);
				this.targetModel.children.splice(index, 1);
			}
			
			this.targetModel = target;
			this.name = target.name;
			this.distance = this.targeter.position.distanceTo(target.position);
		}	
};

game.Target.prototype.Update = function(camera){
	
	if(this.isObject3d(this.targetModel))
	{
		var targetCircle = this.findElement(this.targetModel.children, "name", "target circle");
		if(!targetCircle)
		{
			this.targetCircle = this.graphics.CreateTorus(10, 1,0xF20909);
			this.targetCircle.translateZ(1);
			this.targetCircle.name = "target circle";
			this.targetModel.add(this.targetCircle);
		}
		
		this.distance = this.targeter.position.distanceTo(this.targetModel.position);
		this.targetCircle.lookAt(camera.position);
		
		var targetShade = game.graphics.ChangeColorShade(0xFF, "Red", 60);
		this.targetCircle.material.color.setHex(targetShade);
	}
	
};

