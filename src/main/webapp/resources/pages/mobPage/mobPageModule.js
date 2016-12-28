var mobilierModule = angular.module("mobilierModule", []);
var HeightOptions = function (heightProportion) {
    this.heightProportion = heightProportion;
    this.FIRST_ELEMENT_WIDTH = null;
    this.element = null;
}

var mobilierOptions = new HeightOptions(1.29);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

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
    }, ajaxErrorCallback);
    
}]);

mobilierModule.directive('setMobHeightDimension', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment         
        link: function ($scope, element, attrs) {
            mobilierOptions.element = element;
            setCardHeight(mobilierOptions);

            $rootScope.$on('resize', function (e, eArgs) {
                mobilierOptions.element = element;
                setCardHeight(mobilierOptions);
            })
        }
    }
}])

var setCardHeight = function(options) {
    if (!options.FIRST_ELEMENT_WIDTH) {
        options.FIRST_ELEMENT_WIDTH = options.element.parent().width();
    }

    if (options.FIRST_ELEMENT_WIDTH) {
        if (Math.abs(options.FIRST_ELEMENT_WIDTH - options.element.parent().width()) > 10) {
            options.FIRST_ELEMENT_WIDTH = options.element.parent().width();
        }
    }
    var height = Math.floor(options.FIRST_ELEMENT_WIDTH / options.heightProportion);
    if (!options.isWidthFixed) {
        options.element.width(options.FIRST_ELEMENT_WIDTH);
    }
    options.element.height(height);
};