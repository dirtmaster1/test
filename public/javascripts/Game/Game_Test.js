
    "use strict";
    var renderer = new THREE.WebGLRenderer();
    //game time
    var clock = new THREE.Clock();
	
	var keyboard  = new THREEx.KeyboardState();
	var scene = new THREE.Scene();
	var ui = game.userInterface;
	var keyboard  = new THREEx.KeyboardState();
	var camera;
	var playerShip;
    
    initialize();
    render();

    function initialize() {
		camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        1000
		);
		camera.position.set(0,0,100);
		camera.up = new THREE.Vector3(0,1,0);
		camera.name = 'camera';
		
		scene.add(camera);
		
		playerShip = CreateShip();
		scene.add(playerShip);
		
		var axisHelper = new THREE.AxisHelper( 50 );
		scene.add( axisHelper );
		
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);
    }

    function render() {
        var delta = clock.getDelta();
		UpdateUI();
		UpdateKeyboardInput(keyboard, delta)
		
		
		renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
	
	function CreateShip()
	{
		var model = new THREE.Object3D();

			model.add( new THREE.LineSegments(

				new THREE.Geometry(),

				new THREE.LineBasicMaterial( {
					color: 0xffffff,
					transparent: true,
					opacity: 0.5
				} )

			) );

			model.add( new THREE.Mesh(

				new THREE.Geometry(),

				new THREE.MeshPhongMaterial( {
					color: 0x156289,
					emissive: 0x072534,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading
				} )

			) );
	
			var geometry = new THREE.BoxBufferGeometry( 10, 10, 20 );
			
			model.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
			model.children[ 1 ].geometry = geometry;
			
			var axisHelper = new THREE.AxisHelper( 30 );
			model.add( axisHelper );
			
			model.name = 'playerShip';
			model.rotation.order = 'XZY';
			
			return model;
	}
	
	function UpdateUI(){
		var playerShip = scene.getObjectByName('playerShip');
        var camera = scene.getObjectByName('camera');

        var shipPos = playerShip.position;
        var shipRot = playerShip.rotation;

        var cameraPos = camera.position;
        var cameraRot = camera.rotation;
		var cameraUp = camera.up;

        document.querySelector('#shipPosition').innerHTML = 'Position: <br /> x = ' + shipPos.x + 
																	', <br /> y = ' + shipPos.y + 
																	', <br /> z = ' + shipPos.z;
        document.querySelector('#shipRotation').innerHTML = 'Rotation: <br /> x = ' + shipRot.x +
																	', <br /> y = ' + shipRot.y + 
																	', <br /> z = ' + shipRot.z;
        document.querySelector('#cameraPosition').innerHTML = 'Position: <br /> x = ' + cameraPos.x + 
																	  ', <br /> y = ' + cameraPos.y + 
																	  ', <br /> z = ' + cameraPos.z;
        document.querySelector('#cameraRotation').innerHTML = 'Rotation: <br /> x = ' + cameraRot.x + 
																	  ', <br /> y = ' + cameraRot.y + 
																	  ', <br /> z = ' + cameraRot.z;
		document.querySelector('#cameraUp').innerHTML = 'Up: <br /> x = ' + cameraUp.x + 
														  ', <br /> y = ' + cameraUp.y + 
														  ', <br /> z = ' + cameraUp.z;	
	}
	
	function UpdateKeyboardInput(keyboard, delta)
	{
		var playerShip = scene.getObjectByName('playerShip');
		var moveForward = 0;
		var moveRight = 0;
		var moveUp = 0;
		var rotateY = 0;
		var rotateX = 0;
		
		if(keyboard.pressed("Z"))
        {
            rotateY--;
			
        }

        if(keyboard.pressed("X"))
        {
            rotateY++;
        }
		
		if(keyboard.pressed("W"))
        {
            moveForward--;
        }

        if(keyboard.pressed("S"))
        {
            moveForward++;
        }

        if(keyboard.pressed("D"))
        {
            moveRight++;
        }

        if(keyboard.pressed("A"))
        {
            moveRight--;
        }

        if(keyboard.pressed("R"))
        {
            moveUp++;
        }

        if(keyboard.pressed("F"))
        {
            moveUp--;
        }
		
		playerShip.rotateOnAxis(new THREE.Vector3( 0, 1, 0), (rotateY * 1 * delta));
		//playerShip.rotation.y += rotateY * delta * 5;
		playerShip.translateX(moveRight * delta * 50);
		playerShip.translateY(moveUp * delta * 50);
		playerShip.translateZ(moveForward * delta * 50);
		
	}
