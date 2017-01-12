var honeAndFaienceDetailModule = angular.module("honeAndFaienceDetailModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
};


honeAndFaienceDetailModule.service('honeAndFaienceDetailService', ['$http', function ($http) {
    return {
        getDetailView: function (id) {
            return $http.get('/gresie-faianta/' + id)
        }
    }
}]);

honeAndFaienceDetailModule.controller('honeAndFaienceDetailController', ['$scope', '$routeParams', 'honeAndFaienceDetailService',
    function ($scope, $routeParams, honeAndFaienceDetailService) {
        $scope.presentationSlides = [];
        $scope.thumbneilImages = [];
        $scope.fancyBoxItemsArray = [];
        $scope.fancyBoxSliderArray = [];

        honeAndFaienceDetailService.getDetailView($routeParams.id).then(function (response) {
            var details = response.data;
            $scope.details = details;
            for (var i = 1; i <= details.images; i++) {
                var url = details.baseUrl + i + '.jpg';
                $scope.presentationSlides.push(url);
                $scope.fancyBoxSliderArray.push({href: url, title: ''});
            }

            for (var i = 1; i<= details.items.length; i++) {
                var url = details.baseItemsUrl + i + '.jpg';
                $scope.thumbneilImages.push(url);
                $scope.fancyBoxItemsArray.push({href: url, title: ''});
            }

            $scope.initSlider = true;
            $scope.thumbneilsList = details.items;
        });
    }
]);