var game = game ||{};

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

    function sceneInit(){

      game.lighting.lightingInit(scene);
      scene.add(game.player.playerShip);

      camera.position.set(-100,0,0);
      camera.lookAt(scene.getObjectByName('playerShip').position);
      scene.add(camera);
  };

    function update(){
        var playerShip = scene.getObjectByName('playerShip');
        //playerShip.rotation.x += 0.01;
        //playerShip.rotation.y += 0.01;
    }

  return{
      scene: scene,
      camera: camera,
      sceneInit: sceneInit,
      update: update
  }
})();
