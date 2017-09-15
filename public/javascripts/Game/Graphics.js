var game = game ||{};

game.graphics = (function(){
    'use strict';
		
		var shadeCounter = 0;
		
		function CreateEnergyProjectile(obj)
		{
			var proj = CreateCylinder(0x1a1aff, 1, 1, 5);
			proj.quaternion.set(obj.quaternion.x, obj.quaternion.y, obj.quaternion.z, obj.quaternion.w);
			proj.position.set(obj.position.x, obj.position.y, obj.position.z);
			
			return proj;
		}
		
		function CreateCylinder(color, topRadius, bottomRadius, height){
			
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
		
		function CreateCone(radius, 
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
					shading: THREE.FlatShading
				} )

			) );
	
			var geometry = new THREE.ConeGeometry( radius, height, radialSegments );
			
			model.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
			model.children[ 1 ].geometry = geometry;
			
			return model;
		}

		function CreateBox(color, width, height, depth){
			
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
		
		function CreateTorus(radius, tubeDiameter, color)
		{
			var geometry = new THREE.TorusGeometry( radius, tubeDiameter, 16, 100 );
			var material = new THREE.MeshBasicMaterial( {
															color: color,
															transparent: false
														} )
			var torus = new THREE.Mesh( geometry, material );
			
			return torus;
		}
		
		function ChangeColorShade(hexBaseColor, color, frequency)
		{
			var shade = null;
			
			if(frequency > 0)
			{
				//change to use sine function
				shadeCounter++;
				hexBaseColor = hexBaseColor - (hexBaseColor * ((frequency - shadeCounter)/ frequency))
				
				if(shadeCounter >= frequency)
				{
					shadeCounter = 0;
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
			
		return{
        CreateCone: CreateCone,
		CreateBox: CreateBox,
		CreateTorus: CreateTorus,
		ChangeColorShade : ChangeColorShade,
		CreateEnergyProjectile : CreateEnergyProjectile
    }		
})();	