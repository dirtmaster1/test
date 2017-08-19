var game = game ||{};
game.run = (function() {
    "use strict";
    var renderer = new THREE.WebGLRenderer();
    var manager = game.gameManager;
    //game time
    var clock = new THREE.Clock();
	
	var keyboard  = new THREEx.KeyboardState();
	var mouse = new game.Mouse();
    
    initialize();
    render();

    function initialize() {
        manager.Init(keyboard, mouse);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);
    }

    function render() {
        var delta = clock.getDelta();
		
		manager.Update(delta, keyboard, mouse);
		manager.Reset(mouse);
		
        renderer.render(manager.scene, manager.camera);
        requestAnimationFrame(render);
    }

    return {
        scene: manager.scene
    }
})();