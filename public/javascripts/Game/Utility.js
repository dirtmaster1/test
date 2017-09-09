var game = game ||{};

game.graphics = (function(){
    'use strict';

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

		function CreateTargetBox(color, width, height, depth){
			
			var model = new THREE.Object3D();
			var geometry = new THREE.BoxBufferGeometry( width, height, depth );
			var material = new THREE.MeshPhongMaterial( {
															color: color,
															emissive: 0x072534,
															side: THREE.DoubleSide,
															shading: THREE.FlatShading,
															transparent: true,
															opacity: .5,
														} )
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
			
		return{
        CreateCone: CreateCone,
		CreateTargetBox: CreateTargetBox,
		CreateTorus: CreateTorus
    }	
	
})();	