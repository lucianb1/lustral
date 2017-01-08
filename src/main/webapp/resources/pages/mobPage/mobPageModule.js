var mobilierModule = angular.module("mobilierModule", []);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
};

mobilierModule.service('mobilierService', ['$http', function ($http) {
    return {
        getMobilier: function () {
            return $http.get('/mobilier')
        }
    }
}]);

mobilierModule.controller('mobilierController', ['$scope', '$http', 'mobilierService', function ($scope, $http, mobilierService) {
    $scope.cardsList = [];
    $scope.fancyBoxArray = [];
    mobilierService.getMobilier().then(function (response) {
        $scope.cardsList = response.data;
        angular.forEach($scope.cardsList, function (value, key) {
        	$scope.fancyBoxArray.push({ href: value.url, title: '' });
        });
        $scope.colors = ['#ffffff', '#433543', '#45aa22'];
    }, ajaxErrorCallback);
    
}]);