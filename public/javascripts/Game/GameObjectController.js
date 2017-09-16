var game = game ||{};
game.gameObjectController = (function ()
{
  "use strict";
	 
	var gameObjects = [];
	var graphics = game.graphics;
	var projectileFactory = game.projectileFactory;
	var enemyFactory = game.enemyFactory;
	
	function Init(scene)
	{
		 AddEnemy(0xC0C0C0,0,0,0,scene);
		 AddEnemy(0xa366ff,20,20,20,scene);
		 AddEnemy(0x4dff4d,40,40,40,scene);
		 AddEnemy(0xffff33,-20,-20,-20,scene);
		 AddEnemy(0xff3333,-40,-40,-40,scene);
		 
		var playerShip = scene.getObjectByName('playerShip');
		gameObjects.push({ "model": playerShip, 
						   "owner" : "self",
						   "type" : "player_ship"});
		
	}
	
	function AddEnemy(color, x, y, z, scene)
	{
		var enemy = enemyFactory.Create(color, x, y, z);
		gameObjects.push(enemy);
		scene.add(enemy.model);
	}
	
	function AddProjectile(owner, type, scene)
	{
		var projectile = projectileFactory.Create(type, owner)
		
		gameObjects.push(projectile);
		scene.add(projectile.model);			
	}
	
	function Update(scene, delta){
		
		gameObjects.forEach(function(gameObject){ 
			
			if(gameObject.type.includes("projectile"))
			{
				gameObject.model.translateZ(-1000 * delta);
			}
			
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
	  AddProjectile: AddProjectile,
	  gameObjects: gameObjects
  }
})();


