var game = game ||{};
game.mapBuilder = (function ()
{
  "use strict";
	 
	var graphics = new Graphics();
	
	function Init(scene, gameObjects)
	{
		var count = 100;
		var startPosition = { x:0, y:0, z:0 }
		var shaftLength = 100;
		var shaftWallSize = 100;
		var shaftDirectionAxis = 'z';
		
		for (var i =0; i < count; i++)
		{
			CreateOpenShaft(scene, 
							startPosition, 
							shaftWallSize, 
							shaftLength,
							shaftDirectionAxis); 
							
			startPosition.z -= shaftLength;
		}
    }
	
	function CreateOpenShaft(scene, pos, size, length, direction)
	{
		 var thickness = 1;
		 
		 if(!size)
		 {
			size = 100;
		 }
		 
		 if(!length)
		 {
			 length = 100;
		 }
		 
		 if(direction == 'z')
		 {
			var tileCube1 = graphics.CreateBox(0xfdfe02, size, thickness, size);
			tileCube1.position.set(pos.x, pos.y + length/2, pos.z + length/2);
			
			//green
			var tileCube2 = graphics.CreateBox(0x0bff01, size, thickness, size);
			tileCube2.position.set(pos.x, pos.y - length/2, pos.z + length/2);
			
			//blue
			var tileCube3 = graphics.CreateBox(0x011efe, thickness, size, size);
			tileCube3.position.set(pos.x + length/2, pos.y, pos.z + length/2);
			
			//purple
			var tileCube4 = graphics.CreateBox(0xfe00f6, thickness, size, size);
			tileCube4.position.set(pos.x - length/2, pos.y, pos.z + length/2);
			
			scene.add(tileCube1);
			scene.add(tileCube2);
			scene.add(tileCube3);
			scene.add(tileCube4); 
		 }
		 
		 if(direction == 'y')
		 {
			 //yellow
			 var tileCube1 = graphics.CreateBox(0xfdfe02, size, size, thickness);
			 tileCube1.position.set(pos.x, pos.y, pos.z);
			 
			 //green
			 var tileCube2 = graphics.CreateBox(0x0bff01, size, size, thickness);
			 tileCube2.position.set(pos.x, pos.y, pos.z + length);
			 
			 //blue
			 var tileCube3 = graphics.CreateBox(0x011efe, thickness, size, size);
			 tileCube3.position.set(pos.x + length/2, pos.y, pos.z + length/2);
			 
			 //purple
			 var tileCube4 = graphics.CreateBox(0xfe00f6, thickness, size, size);
			 tileCube4.position.set(pos.x - length/2, pos.y, pos.z + length/2);
			 
			 scene.add(tileCube1);
			 scene.add(tileCube2);
			 scene.add(tileCube3);
			 scene.add(tileCube4);
		 }
	}

    return{
        Init: Init
    }
})();


