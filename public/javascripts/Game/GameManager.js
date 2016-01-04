var game = game ||{};
game.gameManager = (function ()
{
  "use strict";

  var scene = new THREE.Scene();
  var camera = game.camera;
  var UI = game.userInterface;

  function Init(){
     var lighting = game.lighting;
     var player  =  game.player;

     lighting.Init(scene);
     player.Init(scene);
     camera.Init(scene);
     UI.Init(scene);
  };

  function Update(){
        var playerShip = scene.getObjectByName('playerShip');
        //playerShip.rotation.x += 0.01;
        //playerShip.rotation.y += 0.01;
  }

  return{
      scene: scene,
      camera: camera.perspective,
      Init: Init,
      Update: Update
  }
})();
