
describe('Game', function(){

    var manager;

    beforeEach(function(){
        manager = game.gameManager;
    });

    describe('GameManager', function(){

        it('should return scene', function(){
            expect(manager.scene).toBeDefined();
            expect(manager.camera).toBeDefined();
            expect(manager.sceneInit).toBeDefined();
            expect(manager.update).toBeDefined();
        })

    })

    describe('Camera', function(){

        it('should be behind player ship', function(){

            manager.sceneInit();
            var playerShip = manager.scene.getObjectByName('playerShip', true);
            var cameraPos = manager.camera.position;
            var distance = cameraPos.distanceTo(playerShip.position);

            expect(distance).toBe(100);
            expect(playerShip.rotation).toBe(manager.camera.rotation);
        })
    })

})
