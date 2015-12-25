var gameManager = (function ()
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
      var light,
          light2,
          pyramid;

      camera.position.z = 200;
      camera.position.y = 20;

      scene.add(this.camera);

      light = new THREE.SpotLight(new THREE.Color("#ffffff"));
      light.position.set(-50, 100, 0);
      scene.add(light);

      light2 = new THREE.SpotLight(new THREE.Color("#ffffff"));
      light2.position.set(50, 100, 0);
      scene.add(light2);

      var ambientLight = new THREE.AmbientLight(0xbbbbbb);
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

      pyramid = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 20, 4, 4), material);

      scene.add(pyramid);
  };

  return{
      scene: scene,
      camera: camera,
      init: init
  }
})();
