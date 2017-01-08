var mobDetailsModule = angular.module("mobDetailsModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

mobDetailsModule.service('mobDetailsService', ['$http', function ($http) {
    return {
        getDetailView: function (id) {
            return $http.get('/mobilier/detalii/' + id)
        }
    }
}])

mobDetailsModule.controller('mobDetailsController', ['$scope', '$routeParams', 'mobDetailsService',
    function ($scope, $routeParams, mobDetailsService) {
        $scope.images = [];
        $scope.items = [];
        $scope.fancyBoxArray = [];

        mobDetailsService.getDetailView($routeParams.id).then(function (response) {
            $scope.initSlider = true;
            $scope.details = response.data;
            var imagesCount = $scope.details.imagesCount;
            for (var i = 1; i <= imagesCount; i++) {
            	var url = $scope.details.baseUrl + '/' + i + '.jpg';
                $scope.images.push(url);
            	$scope.fancyBoxArray.push({ href: url, title: '' });
              }
            $scope.items = response.data.items;

        }, ajaxErrorCallback)
    }
]);