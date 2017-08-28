var game = game ||{};

game.Target = function(targeter){
    'use strict';
	
	this.targeter = targeter;
	this.targetModel = 'None';
	this.name = '';
	this.distance = null;
	this.isObject3d = function(object)
	{
		return (object.type !== 'undefined' && object.type == 'Object3D');
	}
};	

game.Target.prototype.Set = function(target){
	
	if(this.isObject3d(target))
		{
			this.targetModel = target;
			this.name = target.name;
			this.distance = this.targeter.position.distanceTo(target.position);
		}	
};

game.Target.prototype.Update = function(){
	
	if(this.isObject3d(this.targetModel))
	{
		this.distance = this.targeter.position.distanceTo(this.targetModel.position);
	}
};

