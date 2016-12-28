var mobDetailsModule = angular.module("mobDetailsModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

mobDetailsModule.service('mobDetailsService', ['$http', function ($http) {
    return {
        getDetailView: function (id) {
            return $http.get('/mobilier/details/' + id)
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
            var imagesCount = response.data.imagesCount;
            var name = response.data.name;
            $scope.collectionName = name;
            for (var i = 1; i <= imagesCount; i++) {
            	var url = '/images/mobilier/' + name.toLowerCase().replace(' ', '_') + '/' + i + '.jpg';
                $scope.images.push(url);
            	$scope.fancyBoxArray.push({ href: url, title: '' });
              }
            $scope.items = response.data.items;

        }, ajaxErrorCallback)
    }
]);