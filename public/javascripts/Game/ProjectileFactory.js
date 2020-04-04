var game = game ||{};
game.projectileFactory = (function ()
{
  "use strict";
	 
	var graphics = new Graphics();
	var counter = 1;
	
	function Create(type, owner)
	{
		if(type == "projectile_light_laser")
		{
			var model = CreateLightLaser(owner, type);
			
			return { "model": model, 
					 "owner" : owner.name,
					 "type" : type}
		}
	}
	
	function CreateLightLaser(owner, type)
	{
		var proj = graphics.CreateCylinder(0x1a1aff, 1, 1, 5);
			proj.quaternion.set(owner.quaternion.x, owner.quaternion.y, owner.quaternion.z, owner.quaternion.w);
			proj.position.set(owner.position.x, owner.position.y, owner.position.z);
			
			proj.name = type + '_' + counter;
			counter++;
			
			return proj;			
	}
	
  return{
      Create: Create
  }
})();


