var game = game ||{};
game.testing = (function(){
    'use strict';
	

    function Init(scene){
        var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
		geometry.vertices.push(new THREE.Vector3(0, 10, 0));
		geometry.vertices.push(new THREE.Vector3(10, 0, 0));
		var line = new THREE.Line(geometry, material);
		scene.add(line);
    }

    return{
        Init: Init
    }
})();


