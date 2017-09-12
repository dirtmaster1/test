var game = game ||{};
game.projectileFactory = (function ()
{
  "use strict";
	 
	var graphics = game.graphics;
	
	function CreateProjectile(type, owner)
	{
		if(type == "light_laser")
		{
			var model = CreateLightLaser(owner);
			
			return { "model": model, 
					 "owner" : owner.name,
					 "type" : type}
		}
	}
	
	
	function CreateLightLaser(owner)
	{
		var projectile = graphics.CreateEnergyProjectile(owner);
		return projectile			
	}
	
	
  return{
      CreateProjectile: CreateProjectile
  }
})();


