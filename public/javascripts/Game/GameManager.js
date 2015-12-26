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

    function init(){
      var spotLight1,
          spotLight2,
          ambientLight,
          playerShip;

      scene.add(this.camera);

      spotLight1 = new THREE.SpotLight(new THREE.Color("#ffffff"));
      spotLight1.position.set(-50, 100, 0);
      scene.add(spotLight1);

      spotLight2 = new THREE.SpotLight(new THREE.Color("#ffffff"));
      spotLight2.position.set(50, 100, 0);
      scene.add(spotLight2);

      ambientLight = new THREE.AmbientLight(0xbbbbbb);
      scene.add(ambientLight);

      var material = new THREE.MeshPhongMaterial({
          color: 0x0088aa,
          ambient: 0x0088aa,
          specular: 0x003344,
          shininess: 100,
          shading: THREE.FlatShading,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75
      });

        playerShip = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 20, 4, 4), material);
        playerShip.name = 'playerShip';

      scene.add(playerShip);
  };

    function update(){
        var playerShip = scene.getObjectByName('playerShip');
        playerShip.rotation.x += 0.01;
        playerShip.rotation.y += 0.01;
    }

  return{
      scene: scene,
      camera: camera,
      init: init,
      update: update
  }
})();
