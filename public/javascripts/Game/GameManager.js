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
  var testing = game.testing;
  var playerShip;

  function Init(keyboard, mouse){
     lighting.Init(scene);
     player.Init(scene);
	 testing.Init(scene)
     camera.Init(scene);
	 
	 playerShip = scene.getObjectByName('playerShip');
  };

  function Update(delta, keyboard, mouse){
        
		controls.Update(delta, 
						playerShip, 
						keyboard, 
						mouse);
						
		camera.Update(playerShip, mouse);
						
        ui.Update(scene, mouse);
  }
  
  function Reset(mouse) {

        mouse.mouseClick = false;
		mouse.mouseWheelDelta = 0;
		mouse.mouseDistanceX = 0;
		mouse.mouseDistanceY = 0;
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
