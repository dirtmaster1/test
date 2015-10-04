(function(){

    var app = angular.module('mtgCardApp',[]);

    var CardCtrl = function($scope, $http){
    $scope.cardSets = [];
    $scope.cards = [];
    $scope.selectedCards = [];

        var onComplete = function(response){
            $scope.data = response.data;
            $scope.data.forEach(function(o){
                var set = {};
                set.name = o.name;
                set.code = o.code;
                $scope.cardSets.push(set);
            });
            $scope.cards = $scope.data;
        }

        var onError = function(err){
            $scope.error = err;
        }

        $http.get("http://localhost:8000/api/cards")
            .then(onComplete, onError);

    $scope.updateCardGrid = function(){
        alert('Card Set Changed to ' + $scope.selectedCardSet);
        $scope.selectedCards = $scope.cards.filter(function(obj){
            return obj.code == $scope.selectedCardSet;
        })
    }
    };

    app.controller('CardCtrl',["$scope", "$http", CardCtrl]);
})(document)

