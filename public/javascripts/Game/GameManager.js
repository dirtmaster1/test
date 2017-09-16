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
  var gameObjectController = game.gameObjectController;
  var testing = game.testing;
  
  function Init(keyboard, mouse){
     lighting.Init(scene);
     camera.Init(scene);
	 player.Init(scene, gameObjectController);
	 gameObjectController.Init(scene);
	 
  };

  function Update(delta, keyboard, mouse){
        
		player.Update(scene, 
					  delta, 
					  keyboard, 
					  mouse, 
					  gameObjectController.gameObjects);				
		camera.Update(player.ship, mouse);				
		gameObjectController.Update(scene, delta);
		
        ui.Update(scene, mouse, player);
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
