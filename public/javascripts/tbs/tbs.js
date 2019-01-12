var tbs = tbs ||{};

tbs.run = (function() {
	"use strict";
	
    var renderer = new THREE.WebGLRenderer();
	var keyboard  = new THREEx.KeyboardState();
	var scene = new THREE.Scene();
	var clock = new THREE.Clock();
	
	var mouse = new game.Mouse();
	var ui = tbs.userInterface;
	var factory = tbs.factory;
	var player = tbs.player;
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var camera = new THREE.OrthographicCamera( -width, width, height, -height, 1, 1000 );

	var tileSet = {};
	
    initialize();
    render();

    function initialize() {
        renderer.setSize(width, height);
        document.getElementById("container").appendChild(renderer.domElement);
		
		scene.add(camera);

		tileSet = factory.createTileSet(scene);
		var startTile = tileSet.tiles[0][0];
		
		player.init(factory.createUnit("player", scene, startTile));
    }

    function render() {
		var delta = clock.getDelta();

		player.update(tileSet);
		ui.update(player.info(), mouse);

		renderer.render(scene, camera);
        requestAnimationFrame(render);
	}

})();