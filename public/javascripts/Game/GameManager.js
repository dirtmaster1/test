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
  var testing = game.testing;
  var playerShip;
  var enemyShip;
  var gameObjects = [];

  function Init(keyboard, mouse){
     lighting.Init(scene);
     camera.Init(scene);
	 player.Init(scene);
	 enemy.Init(scene);
	 testing.Init(scene)
	 
	 playerShip = scene.getObjectByName('playerShip');
	 enemyShip = scene.getObjectByName('enemy_1');
	 gameObjects.push(playerShip);
	 gameObjects.push(enemyShip);
  };

  function Update(delta, keyboard, mouse){
        
		player.Update(scene, delta, keyboard, mouse, gameObjects);				
		camera.Update(player.ship, mouse);				
        ui.Update(scene, mouse);
  }
  
  function Reset(mouse) {

        mouse.mouseClick = false;
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
