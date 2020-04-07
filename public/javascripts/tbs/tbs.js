var tbs = tbs ||{};

tbs.run = (function() {
	var renderer = new THREE.WebGLRenderer();
	var scene = new THREE.Scene();
	var clock = new THREE.Clock();
	
	var mouse = new game.Mouse();
	var ui = tbs.userInterface;

	var factory = new Factory();
	var tileSetManager;
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var camera = new THREE.OrthographicCamera( -width, width, height, -height, 1, 1000 );
	camera.position.set(400,400,20);

	var player = null;
	var tileSet = null;
	
    initialize();
    render();

    function initialize() {
        renderer.setSize(width, height);
        document.getElementById("container").appendChild(renderer.domElement);
		
		scene.add(camera);

		factory.initialize();
		
		tileSet = factory.createTileSet(20, 20, scene);
		player = factory.createPlayer("player", scene, 0, 0);
		
		tileSetManager = new TileSetManager(tileSet, player);
    }

    function render() {
		
		delta = clock.getDelta();

		tileSetManager.update(delta);
		
		ui.update(tileSetManager.getGameState(), mouse);

		renderer.render(scene, camera);
        requestAnimationFrame(render);
	}
})();