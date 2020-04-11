var tbs = tbs ||{};

tbs.run = (function() {
	var renderer = new THREE.WebGLRenderer();
	var scene = new THREE.Scene();
	var clock = new THREE.Clock();
	
	var mouse = new game.Mouse();
	var ui = tbs.userInterface;

	var tileSetManager;
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var camera = new THREE.OrthographicCamera( -width, width, height, -height, 1, 1000 );
	camera.position.set(400,400,20);
	
    initialize();
    render();

    function initialize() {
        renderer.setSize(width, height);
        document.getElementById("container").appendChild(renderer.domElement);
		
		scene.add(camera);

		var factory = new Factory();
		factory.initialize();

		tileSetManager = new TileSetManager(factory, scene);
    }

    function render() {
		
		delta = clock.getDelta();

		tileSetManager.update(delta);
		
		ui.update(tileSetManager.getGameState(), mouse);

		renderer.render(scene, camera);
        requestAnimationFrame(render);
	}
})();