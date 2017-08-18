var game = game ||{};
game.testing = (function(){
    'use strict';
	
	function Init(scene){
        
		var xAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
		var xAxisGeometry = new THREE.Geometry();	
			xAxisGeometry.vertices.push(new THREE.Vector3(50, 0, 0));
			xAxisGeometry.vertices.push(new THREE.Vector3(-50, 0, 0));
		var xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
		
		var yAxisMaterial = new THREE.LineBasicMaterial({ color: 0xffff05 });
		var yAxisGeometry = new THREE.Geometry();	
			yAxisGeometry.vertices.push(new THREE.Vector3(0, 50, 0));
			yAxisGeometry.vertices.push(new THREE.Vector3(0, -50, 0));
		var yAxisLine = new THREE.Line(yAxisGeometry, yAxisMaterial);
		
		var zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x25fb33 });
		var zAxisGeometry = new THREE.Geometry();	
			zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, 50));
			zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, -50));
		var zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
		
		scene.add(xAxisLine);
		scene.add(yAxisLine);
		scene.add(zAxisLine);
    }

    return{
        Init: Init
    }
})();


