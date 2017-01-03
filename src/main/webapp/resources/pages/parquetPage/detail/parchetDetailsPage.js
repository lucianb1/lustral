var parchetDetailsModule = angular.module("parchetDetailsModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

parchetDetailsModule.service('parchetDetailsService', ['$http', function ($http) {
    return {
        getDetailsData: function (id) {
            return $http.get('/parchet/detalii/' + id)
        }
    }
}])

parchetDetailsModule.controller('parchetDetailsController', ['$scope', '$routeParams', 'parchetDetailsService',
    function ($scope, $routeParams, parchetDetailsService) {
        $scope.fancyBoxSliderArray = [];
        $scope.imagesArray = [];

        parchetDetailsService.getDetailsData($routeParams.id).then(function (response) {
            $scope.details = response.data;
            $scope.initSlider = true;
            $scope.fancyBoxSliderArray.push({ href: 'http://lustral.ro/images/parchet/34053/34053.jpg', title: '' });
            $scope.imagesArray.push('http://lustral.ro/images/parchet/34053/34053.jpg');
            $scope.fancyBoxSliderArray.push({ href: 'http://lustral.ro/images/parchet/34029/34029.jpg', title: '' });
            $scope.imagesArray.push('http://lustral.ro/images/parchet/34029/34029.jpg');

            $scope.trafficTooltip = 'Clasa 32, denumita si AC4 se preteaza la zone cu trafic intens precum ar fi saloane, magazine, etc..';
            $scope.materialTooltip = 'HDF (High Density Fiberboard)';
            // for (var i = 0; i <= 2; i++) {
            //     var url = ''
            //     $scope.fancyBoxSliderArray.push({ href: url, title: '' });
            //     $scope.imagesArray.push(url);
            // }
            // angular.forEach($scope.presentationSlides, function (value, key) {
            //     $scope.fancyBoxSliderArray.push({ href: value, title: '' });
            // });
        }, ajaxErrorCallback)
    }
]);