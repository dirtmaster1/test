
describe('Game tests', function(){

    var manager;

    beforeEach(function(){
        manager = game.gameManager;
    });

    describe('GameManager tests', function(){
        it('should return scene', function(){
            expect(manager.scene).toBeDefined();
        })
    })
})
