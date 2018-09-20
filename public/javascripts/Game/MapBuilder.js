var game = game ||{};
game.mapBuilder = (function ()
{
  "use strict";
	 
	var graphics = game.graphics;
	
	function Init(scene, gameObjects)
	{
		 var x = 0;
		 var y = 0;
		 var z = 0;
		 
		 // section 1
		 var tileCube1 = graphics.CreateBox(0xeb2300, 100, 100, 10);
		 tileCube1.position.set(x, y, z - 5);
		 
		 var tileCube2 = graphics.CreateBox(0xeb2300, 100, 100, 10);
		 tileCube2.position.set(x, y, z + 105);
		 
		 var tileCube3 = graphics.CreateBox(0xeb2300, 10, 100, 100);
		 tileCube3.position.set(x + 55, y, z + 50);
		 
		 var tileCube4 = graphics.CreateBox(0xeb2300, 10, 100, 100);
		 tileCube4.position.set(x - 55, y, z + 50);
		 
		 // section 1
		 var tileCube5 = graphics.CreateBox(0xeb2300, 100, 100, 10);
		 tileCube5.position.set(x, y + 100, z - 5);
		 
		 var tileCube6 = graphics.CreateBox(0xeb2300, 100, 100, 10);
		 tileCube6.position.set(x, y + 100, z + 105);
		 
		 var tileCube7 = graphics.CreateBox(0xeb2300, 10, 100, 100);
		 tileCube7.position.set(x + 55, y + 100, z + 50);
		 
		 var tileCube8 = graphics.CreateBox(0xeb2300, 10, 100, 100);
		 tileCube8.position.set(x - 55, y + 100, z + 50);
		 
		 scene.add(tileCube1);
		 scene.add(tileCube2);
		 scene.add(tileCube3);
		 scene.add(tileCube4);
		 
		 scene.add(tileCube5);
		 scene.add(tileCube6);
		 scene.add(tileCube7);
		 scene.add(tileCube8);
    }

    return{
        Init: Init
    }
})();


