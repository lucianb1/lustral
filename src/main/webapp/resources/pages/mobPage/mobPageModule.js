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

mobilierModule.controller('mobilierController', ['$scope', '$http', 'mobilierService', 'cacheService', '$timeout', function ($scope, $http, mobilierService, cacheService, $timeout) {
    $scope.cardsList = [];
    $scope.fancyBoxArray = [];
    $scope.scrollPos = 0;

    $(window).on('scroll', function () {
        if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
            $scope.scrollPos = $(window).scrollTop();
        }
    });

    var updateCache = function () {
        cacheService.put('mobCache',
            {
                'cardsList': $scope.cardsList,
                'scrollPos': $scope.scrollPos
            });
    }

    var cachedScope = cacheService.get('mobCache');

    if (cachedScope != undefined) { // nothing in cache
        for (var key in cachedScope) {
            $scope[key] = cachedScope[key];
        }
    } else {
        mobilierService.getMobilier().then(function (response) {
            $scope.cardsList = response.data;
            angular.forEach($scope.cardsList, function (value, key) {
                $scope.fancyBoxArray.push({href: value.url, title: ''});
            });
        }, ajaxErrorCallback);
    }

    $scope.$on('$locationChangeStart', function (event) {
        $scope.okSaveScroll = false;
        if (!$scope.listIsEmpty) {
            updateCache();
        }
    });

    $scope.$on('$routeChangeSuccess', function () {
        $timeout(function () { // wait for DOM, then restore scroll position
            $(window).scrollTop($scope.scrollPos);
            $scope.okSaveScroll = true;
        }); // no parameter, wait for DOM
    });

}]);