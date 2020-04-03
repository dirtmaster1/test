var tbs = tbs ||{};

tbs.run = (function() {
	"use strict";
	
    var renderer = new THREE.WebGLRenderer();
	var scene = new THREE.Scene();
	var clock = new THREE.Clock();
	
	var mouse = new game.Mouse();
	var ui = tbs.userInterface;
	var factory = tbs.factory;
	var tileSetManager;
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var camera = new THREE.OrthographicCamera( -width, width, height, -height, 1, 1000 );
	camera.position.set(400,400,1);
	
    initialize();
    render();

    function initialize() {
        renderer.setSize(width, height);
        document.getElementById("container").appendChild(renderer.domElement);
		
		scene.add(camera);

		var tileSet = factory.createTileSet(20, 20, scene);
		var player = factory.createUnit("player", scene, 0, 0); 
		
		tileSetManager = new TileSetManager(tileSet, player);
    }

    function render() {
		var delta = clock.getDelta();

		tileSetManager.update();
		ui.update(tileSetManager.getGameState(), mouse);

		renderer.render(scene, camera);
        requestAnimationFrame(render);
	}
})();