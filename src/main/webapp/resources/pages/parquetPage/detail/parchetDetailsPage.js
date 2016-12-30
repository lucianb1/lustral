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

        console.log('sadas');
        // $scope.presentationSlides = [];
        // $scope.thumbneilsList = [];
        // $scope.fancyBoxArray = [];
        $scope.fancyBoxSliderArray = [];
        $scope.fancyBoxSliderArray.push({ href: 'http://lustral.ro/images/parchet/34053/34053.jpg', title: '' });
        //
        // parchetDetailsService.getDetailsData($routeParams.id).then(function (response) {
        //     $scope.presentationSlides = response.data.images;
            $scope.initSlider = true;
        //     $scope.name = response.data.name;
        //     $scope.thumbneilsList = response.data.items;
        //     angular.forEach($scope.presentationSlides, function (value, key) {
        //         $scope.fancyBoxSliderArray.push({ href: value, title: '' });
        //     });
        //     angular.forEach($scope.thumbneilsList, function (value, key) {
        //         $scope.fancyBoxArray.push({ href: value.bigImgSrc, title: '' });
        //     });
        // }, ajaxErrorCallback)
    }
]);