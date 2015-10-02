var CardCtrl = function($scope, $http){
    $scope.message = 'it works...';

    var onComplete = function(response){
        $scope.data = response.data;
    }

    var onError = function(err){
        $scope.error = err;
    }

    $http.get("http://localhost:8000/api/cards")
        .then(onComplete, onError);
};
