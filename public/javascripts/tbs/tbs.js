var tbs = tbs ||{};

tbs.run = (function() {
    "use strict";
    var renderer = new THREE.WebGLRenderer();
    
	var clock = new THREE.Clock();
	var graphics = game.graphics;
	var scene = new THREE.Scene();
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var camera = new THREE.OrthographicCamera( -width, width, height, -height, 1, 1000 );
    
    initialize();
    render();

    function initialize() {
        renderer.setSize(width, height);
        document.getElementById("container").appendChild(renderer.domElement);
		
		scene.add(camera);
		mapMandelbrotSet();
    }

    function render() {
        var delta = clock.getDelta();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
	
	function mapMandelbrotSet()
	{
		var iteration = 0;
		var maxIterations = 10;
		var z = [0,0];
		var c = [0,0];
		var c_re = 0;
		var c_im = 0;
		
		var height = 10;
		var width = 10;
		
		for (var x=0; x < width; x++)
		{
			for (var y=0; y < height; y++)
			{
				c_re = (x - width/2)*4.0/width;
				c_im = (y - height/2)*4.0/width;
				
				
				z = [0,0];
				c = [c_re,c_im];
				iteration = 0;
				
				while(iteration < maxIterations && (Math.pow(z[0],2) + Math.pow(z[1],2) <= 4))
				{
					z[0] = Math.pow(z[0],2) - Math.pow(z[1],2) + c[0];
					z[1] = (2 * z[0] * z[1]) + c[1];
					iteration++;										
				}
				
				if(iteration < maxIterations)
				{
					var circle = drawCircle(x,y,-20);
				    scene.add( circle );
				}
			}
		}
	}
	
	function drawCircle(x,y,z)
	{
		var geometry = new THREE.CircleGeometry( 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		var circle = new THREE.Mesh( geometry, material );
		circle.position.set(x,y,z);
		
		return circle;
	}
})();