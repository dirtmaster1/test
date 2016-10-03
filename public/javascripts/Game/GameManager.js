var game = game ||{};
game.gameManager = (function ()
{
  "use strict";

  var scene = new THREE.Scene();
  var camera = game.camera;
  var UI = game.userInterface;
  var controls = game.controls;

  function Init(){
     var lighting = game.lighting;
     var player  =  game.player;

     lighting.Init(scene);
     player.Init(scene);
     camera.Init(scene);
     UI.Init(scene);
  };

  function Update(delta, keyboard, mouse){
        var playerShip = scene.getObjectByName('playerShip');
        controls.Update(delta, keyboard, mouse, playerShip);
        UI.Update(scene);
  }

  return{
      scene: scene,
      camera: camera.perspective,
      controls: controls,
      Init: Init,
      Update: Update
  }
})();
