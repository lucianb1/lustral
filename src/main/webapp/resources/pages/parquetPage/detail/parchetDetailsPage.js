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


            var trafficClass = $scope.details.trafficClass;
            if (trafficClass.includes('31')) {
                $scope.trafficTooltip = 'Clasa 31 (echivalent AC3) se preteaza la zone comerciale cu trafic usor sau la zone rezidentiale cu trafic intens (holuri, sala de oaspeti).';
            } else if (trafficClass.includes('32')) {
                $scope.trafficTooltip = 'Clasa 32 (echivalent AC4) se preteaza la zone comerciale cu trafic mediu precum restaurante, birouri.';
            } else if (trafficClass.includes('33')) {
                $scope.trafficTooltip = 'Clasa 33 (echivalent AC5) se preteaza la zone cu trafic intens pentru zone comerciale, mall-uri, magazine.';
            }
            $scope.materialTooltip = 'HDF (High Density Fiberboard), material net superior MDF';
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