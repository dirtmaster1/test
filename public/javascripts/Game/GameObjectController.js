var game = game ||{};
game.gameObjectController = (function ()
{
  "use strict";
	 
	var gameObjects = [];
	var graphics = game.graphics;
	var projectileFactory = game.projectileFactory;
	var enemyFactory = game.enemyFactory;
	var playerShip = {};
	
	function Init(scene)
	{
		 AddEnemy(0xC0C0C0,0,0,0,scene);
		 AddEnemy(0xa366ff,20,20,20,scene);
		 AddEnemy(0x4dff4d,40,40,40,scene);
		 AddEnemy(0xffff33,-20,-20,-20,scene);
		 AddEnemy(0xff3333,-40,-40,-40,scene);
		 
		playerShip = scene.getObjectByName('playerShip');
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
		
		var projectiles = GetAll('projectile', false);
		var enemies = GetAll('enemy', true);
		
		projectiles.forEach(function(projectile){ 
			Intersect(projectile.model, enemies, scene);
			
			projectile.model.translateZ(-500 * delta);
			
		});		
	  }
	  function Intersect(object, objectList, scene) {

			object.updateMatrix();	 
			var localVertex = object.children[0].geometry.vertices[0].clone();
			var globalVertex = localVertex.applyMatrix4(object.matrix);
			var directionVector = globalVertex.sub(object.position);
			
			//testing start
				  // var shootVector = directionVector.add(object.position);
				  // var xAxisMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
					 // var xAxisGeometry = new THREE.Geometry();
					// xAxisGeometry.vertices.push(shootVector);						 
					// xAxisGeometry.vertices.push(object.position);
					 // var xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
					 // scene.add(xAxisLine);
				 //end testing
			
			var ray = new THREE.Raycaster(object.position, directionVector.clone().normalize());

			var collisionResults = ray.intersectObjects(objectList, true);

			if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) 
			{
				 var hitObject = collisionResults[0].object.parent;
				 console.log('Hit', hitObject.name);
				
				if(playerShip.userData.target.name == hitObject.name)
				{
					playerShip.userData.target.Remove();
				}					
					
				Explode(scene, hitObject);
				
				RemoveGameObjectByName(gameObjects, hitObject.name);
				RemoveGameObjectByName(gameObjects, object.name);
				scene.remove( hitObject );
				scene.remove( object );
			}
		 }
		 
	  function Explode(scene, obj)
	  {
		var explosion = graphics.ExplosionAnimation();
		explosion.position.set(obj.position.x, obj.position.y, obj.position.z);
		
	    scene.add(explosion); 

		setTimeout(function()
		{ 
		   scene.remove(explosion);
		}, 3000);
	  }	  
	  
	  function RemoveGameObjectByName(gameObjects, name)
	  {
		  for (var i =0; i < gameObjects.length; i++)
		   if (gameObjects[i].model.name === name) {
			  gameObjects.splice(i,1);
			  break;
			}
	  }
	  
	  
	  function GetAll(type, onlyModels)
	  {
		  var objects = [];
		  
		  gameObjects.forEach(function(gameObject){ 
			
				if(gameObject.type.includes(type))
				{
					if(onlyModels)
					{
						objects.push(gameObject.model);	
					} else 
					{
						objects.push(gameObject);
					}
				}
			
			});
			
			return objects;
	  }
  
  return{
      Update: Update,
	  Init: Init,
	  AddProjectile: AddProjectile,
	  gameObjects: gameObjects
  }
})();


