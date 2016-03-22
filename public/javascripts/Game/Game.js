var game = game ||{};
game.run = (function() {
    "use strict";
    var renderer = new THREE.WebGLRenderer();
    var manager = game.gameManager;
    //game time
    var clock = new THREE.Clock();
    var keyboard  = new THREEx.KeyboardState();

    initialize();
    render();

    function initialize() {
        manager.Init();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);
    }

    function render() {
        var delta = clock.getDelta();
        manager.Update(delta, keyboard);
        renderer.render(manager.scene, manager.camera);
        requestAnimationFrame(render);
    }

    return {
        scene: manager.scene
    }
})();