var game = (function() {
    "use strict";
    var renderer = new THREE.WebGLRenderer();

    initialize();
    render();

    function initialize() {
        gameManager.init();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);
    }

    function render() {
        renderer.render(gameManager.scene, gameManager.camera);
        requestAnimationFrame(render);
    }

    return {
        scene: gameManager.scene
    }
})();