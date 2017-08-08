var game = game ||{};

game.lighting = (function(){
	'use strict';
	
    var spotLight1,
        spotLight2;

    function Init(scene) {
        spotLight1 = new THREE.SpotLight(new THREE.Color("#ffffff"));
        spotLight1.position.set(-50, 100, 0);
        scene.add(spotLight1);

        spotLight2 = new THREE.SpotLight(new THREE.Color("#ffffff"));
        spotLight2.position.set(50, 100, 0);
        scene.add(spotLight2);
    }

    return{
        Init : Init
    }

})();
