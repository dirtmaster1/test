
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
            var playerShipPos = manager.scene.getObjectByName('playerShip', true).position;
            var cameraPos = manager.camera.position;
            var distance = cameraPos.distanceTo(playerShipPos);

            expect(distance).toBe(100);
        })
    })

})
