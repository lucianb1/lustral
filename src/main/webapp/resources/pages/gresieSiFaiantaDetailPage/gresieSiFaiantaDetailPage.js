var honeAndFaienceDetailModule = angular.module("honeAndFaienceDetailModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

var honeAndFaianceDetailHeightOptions = new HeightOptions(1.4);

honeAndFaienceDetailModule.directive('setHeight', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment         
        link: function ($scope, element, attrs) {
            honeAndFaianceDetailHeightOptions.element = element;
            setCardHeight(honeAndFaianceDetailHeightOptions);

            $rootScope.$on('resize', function (e, eArgs) {
                honeAndFaianceDetailHeightOptions.element = element;
                setCardHeight(honeAndFaianceDetailHeightOptions);
            })
        }
    }
}])

honeAndFaienceDetailModule.service('honeAndFaienceDetailService', ['$http', function ($http) {
    return {
        getDetailView: function (id) {
            return $http.get('/gresie-faianta/' + id)
        }
    }
}])

honeAndFaienceDetailModule.controller('honeAndFaienceDetailController', ['$scope', '$routeParams', 'honeAndFaienceDetailService',
    function ($scope, $routeParams, honeAndFaienceDetailService) {
        $scope.presentationSlides = [];
        $scope.thumbneilsList = [];
        $scope.fancyBoxArray = [];
        $scope.fancyBoxSliderArray = [];

        honeAndFaienceDetailService.getDetailView($routeParams.id).then(function (response) {
            $scope.presentationSlides = response.data.images;
            $scope.initSlider = true;
            $scope.name = response.data.name;
            $scope.thumbneilsList = response.data.items;
            angular.forEach($scope.presentationSlides, function (value, key) {
                $scope.fancyBoxSliderArray.push({ href: value, title: '' });
            });
            angular.forEach($scope.thumbneilsList, function (value, key) {
                $scope.fancyBoxArray.push({ href: value.bigImgSrc, title: '' });
            });
        }, ajaxErrorCallback)
    }
]);