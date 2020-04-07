class Graphics {
		
	constructor()
	{
		this.shadeCounter = 0;
	}	
	
		
		createCircle(radius, segments)
		{
			var model = new THREE.Object3D();
			var geometry = new THREE.CircleGeometry(radius, segments);
			var material = new THREE.MeshBasicMaterial( {
									color: 0x0000ff, //blue
									side: THREE.DoubleSide,
									shading: THREE.FlatShading,
									transparent: false,
									opacity: 1
									} );
			var	mesh = new THREE.Mesh( geometry, material );
			
			model.add(mesh);
			
			return model;
		}
		
		CreateCylinder(color, topRadius, bottomRadius, height){
			
			var model = new THREE.Object3D();
			var geometry = new THREE.CylinderGeometry( topRadius, bottomRadius, height, 32 );
			var material = new THREE.MeshBasicMaterial( {
									color: color,
									side: THREE.DoubleSide,
									shading: THREE.FlatShading,
									transparent: true,
									opacity: .5
									} );
			var	mesh = new THREE.Mesh( geometry, material );
			
			model.add(mesh);
			
			return model;
		}
		
		CreateCone(radius, 
			height, 
			radialSegments, 
			color) {
				
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
					color: color,
					emissive: 0x072534,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading,
					transparent: true,
					opacity: 0.5
				} )

			) );
	
			var geometry = new THREE.ConeGeometry( radius, height, radialSegments );
			
			model.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
			model.children[ 1 ].geometry = geometry;
			
			return model;
		}

		CreateBoxWithTexture(width, height, depth, texture){
			
			var model = new THREE.Object3D();
			var geometry = new THREE.BoxBufferGeometry( width, height, depth );
			var	mesh = new THREE.Mesh( geometry, texture );
			
			model.add(mesh);
			
			return model;
		}

		loadTexture(path)
		{
			const loader = new THREE.TextureLoader();
			const material = new THREE.MeshBasicMaterial({map: loader.load(path),
				side: THREE.DoubleSide});
		    return material;
		}

		CreateBox(color, width, height, depth){
			
			var model = new THREE.Object3D();
			var geometry = new THREE.BoxBufferGeometry( width, height, depth );
			var material = new THREE.MeshBasicMaterial( {
									color: color,
									side: THREE.DoubleSide,
									shading: THREE.FlatShading,
									transparent: true,
									opacity: .5
									} );
			var	mesh = new THREE.Mesh( geometry, material );
			
			model.add(mesh);
			
			return model;
		}	
		
		CreateTorus(radius, tubeDiameter, color)
		{
			var geometry = new THREE.TorusGeometry( radius, tubeDiameter, 16, 100 );
			var material = new THREE.MeshBasicMaterial( {
															color: color,
															transparent: false
														} )
			var torus = new THREE.Mesh( geometry, material );
			
			return torus;
		}
		
		ChangeColorShade(hexBaseColor, color, frequency)
		{
			var shade = null;
			
			if(frequency > 0)
			{
				//change to use sine function
				this.shadeCounter++;
				hexBaseColor = hexBaseColor - (hexBaseColor * ((frequency - this.shadeCounter)/ frequency))
				
				if(this.shadeCounter >= frequency)
				{
					this.shadeCounter = 0;
				}
			}
			
			if(color == "Red")
			{
			  shade = hexBaseColor << 16;	
			}
			
			if(color == "Green")
			{
			  shade = hexBaseColor << 8;	
			}
			
			if(color == "Blue")
			{
			  shade = hexBaseColor;	
			}
			
			return shade;
		}
		
		ExplosionAnimation()
		{
			var explosion =	this.CreateBox(0xeb2300, 5, 5, 5);
			
			return explosion;
		}
    };	