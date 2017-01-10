var honeAndFaienceModule = angular.module("honeAndFaienceModule", []);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

honeAndFaienceModule.service('honeAndFaienceService', ['$http', function ($http) {
    return {
        getHoneAndFaience: function () {
            return $http.get('/gresie-faianta');
        }
    }
}]);

honeAndFaienceModule.controller('honeAndFaienceController', ['$scope', '$routeParams', 'honeAndFaienceService', 'cacheService', '$timeout',
    function ($scope, $routeParams, honeAndFaienceService, cacheService, $timeout) {
        $scope.cardsList = [];
        $scope.sortValue = null;
        $scope.scrollPos = 0;

        $(window).on('scroll', function () {
            if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                $scope.scrollPos = $(window).scrollTop();
            }
        });

        var initializeGresie = function () {
            honeAndFaienceService.getHoneAndFaience($routeParams.collection).then(function (response) {
                $scope.cardsList = response.data;
            }, ajaxErrorCallback);
        };

        var cachedScope = cacheService.get('gresieCache');

        if (cachedScope == undefined) { // nothing in cache
            initializeGresie();
        } else {
            for (var key in cachedScope) {
                console.log(key);
                $scope[key] = cachedScope[key];
            }
        }


        var updateCache = function () {
            cacheService.put('gresieCache',
                {
                    'currentPage': $scope.currentPage,
                    'cardsList': $scope.cardsList,
                    'sortValue': $scope.sortValue,
                    'canLoadNextPage': $scope.canLoadNextPage,
                    'listIsEmpty': $scope.listIsEmpty,
                    'isPageReady': $scope.isPageReady,
                    'scrollPos': $scope.scrollPos
                });
        };


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


    }
]);