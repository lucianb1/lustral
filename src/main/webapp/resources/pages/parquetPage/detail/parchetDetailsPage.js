var parchetDetailsModule = angular.module("parchetDetailsModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
};

parchetDetailsModule.service('parchetDetailsService', ['$http', function ($http) {
    return {
        getDetailsData: function (id) {
            return $http.get('/parchet/detalii/' + id)
        }
    }
}]);

parchetDetailsModule.controller('parchetDetailsController', ['$scope', '$routeParams', 'parchetDetailsService',
    function ($scope, $routeParams, parchetDetailsService) {
        $scope.fancyBoxSliderArray = [];
        $scope.imagesArray = [];

        parchetDetailsService.getDetailsData($routeParams.id).then(function (response) {
            $scope.details = response.data;
            $scope.initSlider = true;

            for (var i = 1; i <= $scope.details.images; i++) {
                $scope.fancyBoxSliderArray.push({href: $scope.details.baseUrl + i + '.jpg', title: ''});
                $scope.imagesArray.push($scope.details.baseUrl + i + '.jpg');
            }

            var trafficClass = $scope.details.trafficClass;
            if (trafficClass.includes('31')) {
                $scope.trafficTooltip = 'Clasa 31 (echivalent AC3) se preteaza la zone comerciale cu trafic usor sau la zone rezidentiale cu trafic intens (holuri, sala de oaspeti).';
            } else if (trafficClass.includes('32')) {
                $scope.trafficTooltip = 'Clasa 32 (echivalent AC4) se preteaza la zone comerciale cu trafic mediu precum restaurante, birouri.';
            } else if (trafficClass.includes('33')) {
                $scope.trafficTooltip = 'Clasa 33 (echivalent AC5) se preteaza la zone cu trafic intens pentru zone comerciale, mall-uri, magazine.';
            }
            $scope.materialTooltip = 'HDF (High Density Fiberboard), material net superior MDF';
        }, ajaxErrorCallback)
    }
]);