var game = game ||{};
game.lighting = (function(){
    var spotLight1,
        spotLight2,
        ambientLight;

    function Init(scene) {
        spotLight1 = new THREE.SpotLight(new THREE.Color("#ffffff"));
        spotLight1.position.set(-50, 100, 0);
        scene.add(spotLight1);

        spotLight2 = new THREE.SpotLight(new THREE.Color("#ffffff"));
        spotLight2.position.set(50, 100, 0);
        scene.add(spotLight2);

        ambientLight = new THREE.AmbientLight(0xbbbbbb);
        scene.add(ambientLight);
    }

    return{
        Init : Init
    }

})();
