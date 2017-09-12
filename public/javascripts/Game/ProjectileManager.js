var game = game ||{};
game.projectileManager = (function ()
{
  "use strict";
	 
	var projectiles = [];
	var graphics = game.graphics;
	var factory = game.projectileFactory;
	
	function Init()
	{
		
		
	}
	
	function Add(owner, type, scene)
	{
		var projectile = factory.CreateProjectile(type, owner)
		
		projectiles.push(projectile);
		scene.add(projectile.model);
					
	}
	
	function Update(scene, gameObjects, delta){
		
		projectiles.forEach(function(projectile){ 
			
			projectile.model.translateZ(-100 * delta);
			
		});
		
		// function Intersect(object, objectList) {

			// for (var vertexIndex = 0; vertexIndex < 1; vertexIndex++) {
				// //object.children[0].geometry.vertices.length
				// var localVertex = object.children[0].geometry.vertices[vertexIndex].clone();
				// var globalVertex = localVertex.applyMatrix4(object.matrix);
				// var directionVector = globalVertex.sub(object.position);
				
				// var ray = new THREE.Raycaster(object.position, directionVector.clone().normalize());

				// var collisionResults = ray.intersectObjects(objectList, true);

				// if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
					// console.log('Hit', collisionResults[0].object.parent.name);
			// }
		// }
			
			
	  }
  
  return{
      Update: Update,
	  Init: Init,
	  Add: Add
  }
})();


