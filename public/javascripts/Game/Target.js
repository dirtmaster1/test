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
	
	//todo move into another class
	this.shadeCounter = 0;
	this.changeColorShade = function(hexBaseColor, color, frequency)
	{
		var shade = null;
		
		if(frequency > 0)
		{
			//change to use sine function
			this.shadeCounter++;
			hexBaseColor = hexBaseColor - (hexBaseColor * ((frequency - this.shadeCounter)/ frequency))
			
			if(this.shadeCounter >= frequency)
			{
				this.shadeCounter = 0;
			}
		}
		
		if(color == "Red")
		{
		  shade = hexBaseColor << 16;	
		}
		
		if(color == "Green")
		{
		  shade = hexBaseColor << 8;	
		}
		
		if(color == "Blue")
		{
		  shade = hexBaseColor;	
		}
		
		return shade;
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

game.Target.prototype.Update = function(camera){
	
	if(this.isObject3d(this.targetModel))
	{
		var targetBox = this.findElement(this.targetModel.children, "name", "target box");
		if(!targetBox)
		{
			this.targetBox = this.graphics.CreateTorus(10, 1,0xF20909);
			this.targetBox.translateZ(1);
			this.targetBox.name = "target box";
			this.targetModel.add(this.targetBox);
		}
		
		this.distance = this.targeter.position.distanceTo(this.targetModel.position);
		this.targetBox.lookAt(camera.position);
		
		var targetShade = this.changeColorShade(0xFF, "Red", 60);
		this.targetBox.material.color.setHex(targetShade);
	}
	
};

