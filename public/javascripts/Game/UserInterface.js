var game = game ||{};
game.userInterface = (function ()
{
    "use strict";

    function Update(scene, mouse){
        var playerShip = scene.getObjectByName('playerShip');
        var camera = scene.getObjectByName('camera');

        var shipPos = playerShip.position;
        var shipRot = playerShip.rotation;

        var cameraPos = camera.position;
        var cameraRot = camera.rotation;

        document.querySelector('#shipPosition').innerHTML = 'Position: <br /> x = ' + shipPos.x + ', <br /> y = ' + shipPos.y + ', <br /> z = ' + shipPos.z;
        document.querySelector('#shipRotation').innerHTML = 'Rotation: <br /> x = ' + shipRot.x + ', <br /> y = ' + shipRot.y + ', <br /> z = ' + shipRot.z;
        document.querySelector('#cameraPosition').innerHTML = 'Position: <br /> x = ' + cameraPos.x + ', <br /> y = ' + cameraPos.y + ', <br /> z = ' + cameraPos.z;
        document.querySelector('#cameraRotation').innerHTML = 'Rotation: <br /> x = ' + cameraRot.x + ', <br /> y = ' + cameraRot.y + ', <br /> z = ' + cameraRot.z;
		document.querySelector('#mousePositionX').innerHTML = 'Position: <br /> x: ' + mouse.mouseX + ',';
        document.querySelector('#mousePositionY').innerHTML = 'y: ' + mouse.mouseY + '<br />';
        }

    return{
        Update: Update
    }
})();
