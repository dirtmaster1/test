var game = game ||{};

game.Target = function(targeter){
    'use strict';
	
	this.graphics = game.graphics;
	this.targeter = targeter;
	this.targetModel = 'None';
	this.name = '';
	this.distance = null;
	this.targetChanged = false;
	this.targetBox = null;
	
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

game.Target.prototype.Set = function(target){
	
	if(this.isObject3d(target))
		{
			if((this.targetModel !== target) && this.isObject3d(this.targetModel))
			{
				this.targetChanged = true;
				var index = this.targetModel.children.indexOf(this.targetBox);
				this.targetModel.children.splice(index, 1);
			}
			
			this.targetModel = target;
			this.name = target.name;
			this.distance = this.targeter.position.distanceTo(target.position);
		}	
};

game.Target.prototype.Update = function(){
	
	if(this.isObject3d(this.targetModel))
	{
		this.distance = this.targeter.position.distanceTo(this.targetModel.position);
		
		var targetBox = this.findElement(this.targetModel.children, "name", "target box");
		if(!targetBox)
		{
			this.targetBox = this.graphics.CreateTargetBox(0x156289, 17.5, 17.5, 17.5);
			this.targetBox.translateZ(1);
			this.targetBox.name = "target box";
			this.targetModel.add(this.targetBox);
		}
	}
	
};

