
describe('Game', function(){

    var manager;

    beforeEach(function(){
        fixture.setBase('tests/fixtures')
    });

    beforeEach(function(){
        this.result = fixture.load('gameFixture.html');
    });

    afterEach(function(){
        fixture.cleanup()
    });

    beforeEach(function(){
        manager = game.gameManager;
    });

    describe('GameManager', function(){

        it('should return scene', function(){
            expect(manager.scene).toBeDefined();
            expect(manager.camera).toBeDefined();
            expect(manager.Init).toBeDefined();
            expect(manager.Update).toBeDefined();
        })

    })

    describe('Camera', function(){

        it('should be behind player ship', function(){

            manager.Init();
            var playerShip = manager.scene.getObjectByName('playerShip', true);
            var cameraPos = manager.camera.position;
            var distance = cameraPos.distanceTo(playerShip.position);

            var shipMatrix = new THREE.Matrix4();
            shipMatrix.extractRotation( playerShip.matrix );

            var shipDirection = new THREE.Vector3( 0, 0, 1 );
            shipDirection.applyMatrix4( shipMatrix )

            var cameraMatrix = new THREE.Matrix4();
            cameraMatrix.extractRotation( manager.camera.matrix );

            var cameraDirection = new THREE.Vector3( 0, 0, 1 );
            cameraDirection.applyMatrix4( cameraMatrix )

            expect(distance).toBe(100);
            expect(playerShip.rotation.x).toBe(Math.abs(manager.camera.rotation.x));
            expect(playerShip.rotation.y).toBe(Math.abs(manager.camera.rotation.y));
            expect(playerShip.rotation.z).toBe(Math.abs(manager.camera.rotation.z));
            expect(shipDirection.dot(cameraDirection)).toBe(1);
        })
    })

    describe('Controls', function(){

        it('should move player ship forward', function(){

            manager.Init();

            //simulate key press
            function keyPress(key) {
                var event = document.createEvent('Event');
                event.keyCode = key;
                event.initEvent('keydown');
                document.dispatchEvent(event);
            }

            keyPress(83);

            manager.Update();
            var playerShip = manager.scene.getObjectByName('playerShip');
            expect(playerShip.position.x).toBe(0);
            expect(playerShip.position.y).toBe(0);
            expect(playerShip.position.z).toBe(-1);
        })
    })

})
