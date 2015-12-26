game.run = (function() {
    "use strict";
    var renderer = new THREE.WebGLRenderer();
    var manager = game.gameManager;

    initialize();
    render();

    function initialize() {
        manager.init();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);
    }

    function render() {
        manager.update();
        renderer.render(manager.scene, manager.camera);
        requestAnimationFrame(render);
    }

    return {
        scene: manager.scene
    }
})();