game.gameManager = (function ()
{
  "use strict";

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
          35,
          window.innerWidth / window.innerHeight,
          1,
          1000
      );
  var lighting = game.lighting;
  var player  =  game.player;

    function Init(){

      lighting.Init(scene);
      scene.add(player.ship);

      camera.position.set(0,0,100);
      camera.up = new THREE.Vector3(0,1,0);
      camera.lookAt(scene.getObjectByName('playerShip').position);
      scene.add(camera);
  };

    function Update(){
        var playerShip = scene.getObjectByName('playerShip');
        //playerShip.rotation.x += 0.01;
        //playerShip.rotation.y += 0.01;
    }

  return{
      scene: scene,
      camera: camera,
      Init: Init,
      Update: Update
  }
})();
