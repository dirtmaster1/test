var game = game ||{};
game.projectileFactory = (function ()
{
  "use strict";
	 
	var graphics = game.graphics;
	
	function Create(type, owner)
	{
		if(type == "projectile_light_laser")
		{
			var model = CreateLightLaser(owner);
			
			return { "model": model, 
					 "owner" : owner.name,
					 "type" : type}
		}
	}
	
	function CreateLightLaser(owner)
	{
		var projectile = CreateEnergyProjectile(owner);
		return projectile			
	}
	
	function CreateEnergyProjectile(obj)
	{
			var proj = graphics.CreateCylinder(0x1a1aff, 1, 1, 5);
			proj.quaternion.set(obj.quaternion.x, obj.quaternion.y, obj.quaternion.z, obj.quaternion.w);
			proj.position.set(obj.position.x, obj.position.y, obj.position.z);
			
			return proj;
	}

  return{
      Create: Create
  }
})();


