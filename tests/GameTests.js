
describe('Game', function(){

    var manager;
    var clock;

    beforeEach(function(){
        fixture.setBase('tests/fixtures')
    });

    beforeEach(function(){
        this.result = fixture.load('gameFixture.html');
    });

    beforeEach(function(){
        manager = game.gameManager;
        manager.Init();
        clock = new THREE.Clock();
    });

    afterEach(function(){
        for( var i = manager.scene.children.length - 1; i >= 0; i--) {
            var obj = manager.scene.children[i];
            manager.scene.remove(obj);}
        fixture.cleanup()
    });

    describe('GameManager', function(){

        it('should return scene', function(){
            expect(manager.scene).toBeDefined();
            expect(manager.camera).toBeDefined();
            expect(manager.Init).toBeDefined();
            expect(manager.Update).toBeDefined();
            expect(manager.controls).toBeDefined();
        })

    })

    describe('Camera', function(){

        it('should be behind player ship', function(){

            var playerShip = manager.scene.getObjectByName('playerShip', true);
            var cameraPos = manager.camera.position;
            var distance = cameraPos.distanceTo(playerShip.position);

            var shipMatrix = new THREE.Matrix4();
            shipMatrix.extractRotation( playerShip.matrix );

            var shipDirection = new THREE.Vector3( 0, 0, 1 );
            shipDirection.applyMatrix4( shipMatrix );

            var cameraMatrix = new THREE.Matrix4();
            cameraMatrix.extractRotation( manager.camera.matrix );

            var cameraDirection = new THREE.Vector3( 0, 0, 1 );
            cameraDirection.applyMatrix4( cameraMatrix );

            expect(distance).toBe(100);
            expect(playerShip.rotation.x).toBe(Math.abs(manager.camera.rotation.x));
            expect(playerShip.rotation.y).toBe(Math.abs(manager.camera.rotation.y));
            expect(playerShip.rotation.z).toBe(Math.abs(manager.camera.rotation.z));
            expect(shipDirection.dot(cameraDirection)).toBe(1);
        })
    })

    describe('Keyboard Controls', function(){

        //simulate key press
        function keyPress(key) {
            var event = document.createEvent('Event');
            event.keyCode = key;
            event.initEvent('keydown');
            document.dispatchEvent(event);
        }

        it('should initialize controls', function(){
            expect(manager.controls).toBeDefined();
        });

        it('should move player ship forward', function(){
            var playerShip = manager.scene.getObjectByName('playerShip');
            playerShip.position.set(0,0,0);
            keyPress(87);

            manager.Update(clock.getDelta());

            expect(playerShip.position.x).toBe(0);
            expect(playerShip.position.y).toBe(0);
            expect(playerShip.position.z).toBe(-1);
        })

        it('should move player ship backward', function(){

            var playerShip = manager.scene.getObjectByName('playerShip');
            playerShip.position.set(0,0,0);
            keyPress(83);

            manager.Update(clock.getDelta());

            expect(playerShip.position.x).toBe(0);
            expect(playerShip.position.y).toBe(0);
            expect(playerShip.position.z).toBe(1);
        })

        it('should move player ship to right', function(){

            var playerShip = manager.scene.getObjectByName('playerShip');
            playerShip.position.set(0,0,0);
            keyPress(68);

            manager.Update(clock.getDelta());

            expect(playerShip.position.x).toBe(1);
            expect(playerShip.position.y).toBe(0);
            expect(playerShip.position.z).toBe(0);
        })

        it('should move player ship to left', function(){

            var playerShip = manager.scene.getObjectByName('playerShip');
            playerShip.position.set(0,0,0);
            keyPress(65);

            manager.Update(clock.getDelta());

            expect(playerShip.position.x).toBe(-1);
            expect(playerShip.position.y).toBe(0);
            expect(playerShip.position.z).toBe(0);
        })

        it('should move player ship up', function(){

            var playerShip = manager.scene.getObjectByName('playerShip');
            playerShip.position.set(0,0,0);
            keyPress(82);

            manager.Update(clock.getDelta());

            expect(playerShip.position.x).toBe(0);
            expect(playerShip.position.y).toBe(1);
            expect(playerShip.position.z).toBe(0);
        })

        it('should move player ship to down', function(){

            var playerShip = manager.scene.getObjectByName('playerShip');
            playerShip.position.set(0,0,0);
            keyPress(70);

            manager.Update(clock.getDelta());

            expect(playerShip.position.x).toBe(0);
            expect(playerShip.position.y).toBe(-1);
            expect(playerShip.position.z).toBe(0);
        })
    })

});
