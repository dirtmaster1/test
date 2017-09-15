var game = game ||{};
game.gameManager = (function ()
{
  "use strict";

  var scene = new THREE.Scene();
  var camera = game.camera;
  var ui = game.userInterface;
  var controls = game.controls;
  var lighting = game.lighting;
  var player  =  game.player;
  var enemy = game.enemy;
  var projectileManager = game.projectileManager;
  var testing = game.testing;
  
  var playerShip;
  
  var gameObjects = [];
  

  function Init(keyboard, mouse){
     lighting.Init(scene);
     camera.Init(scene);
	 player.Init(scene, projectileManager);
	 
	 //move into enemy factory
	 var enemy1 = enemy.Create(scene, 0xC0C0C0);
	 
	 var enemy2 = enemy.Create(scene, 0xa366ff);
	 enemy2.position.set(20, 20, 20);
	 
	 var enemy3 = enemy.Create(scene, 0x4dff4d);
	 enemy3.position.set(40, 40, 40);
	 
	 var enemy4 = enemy.Create(scene, 0xffff33);
	 enemy4.position.set(-20, -20, -20);
	 
	 var enemy5 = enemy.Create(scene, 0xff3333);
	 enemy5.position.set(-40, -40, -40);
	 
	 //testing.Init(scene)
	 
	 playerShip = scene.getObjectByName('playerShip');
	 gameObjects.push(playerShip);
	 gameObjects.push(enemy1);
	 gameObjects.push(enemy2);
	 gameObjects.push(enemy3);
	 gameObjects.push(enemy4);
	 gameObjects.push(enemy5);
	 
  };

  function Update(delta, keyboard, mouse){
        
		player.Update(scene, delta, keyboard, mouse, gameObjects);				
		camera.Update(player.ship, mouse);				
		projectileManager.Update(scene, gameObjects, delta);
		
        ui.Update(scene, mouse);
  }
  
  function Reset(mouse) {

        mouse.mouseClick = false;
		mouse.mouseRightClick = false;
		mouse.mouseWheelDelta = 0;
  }


  return{
      scene: scene,
      camera: camera.Camera,
      controls: controls,
      Init: Init,
      Update: Update,
	  Reset: Reset
  }
})();
