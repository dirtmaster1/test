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

  function Init(keyboard, mouse){
     lighting.Init(scene);
     player.Init(scene);
	 testing.Init(scene)
     camera.Init(scene);
  };

  function Update(delta, keyboard, mouse){
        var playerShip = scene.getObjectByName('playerShip');
        
		controls.Update(delta, 
						playerShip, 
						keyboard, 
						mouse);
						
        camera.Update(scene, playerShip);
		ui.Update(scene, mouse);
  }

  return{
      scene: scene,
      camera: camera.perspective,
      controls: controls,
      Init: Init,
      Update: Update
  }
})();
