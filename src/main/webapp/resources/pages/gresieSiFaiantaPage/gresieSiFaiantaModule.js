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
        $scope.materialOptions = [{id: null, value: 'Portelanata/rectificata'}, {id: 'p', value:'portelanata'}, {id:'r', value: 'rectificata'}];
        $scope.materialValues = [];
        $scope.designOptions = [{id: null, value: 'Gama de culori'}, {id: 1, value: 'Imitatii lemn'}, {id: 2, value: 'Imitatii piatra'}, {id: 3, value: 'Alb-gri'}];
        $scope.designValues = [];
        $scope.roomOptions = [{id: null, value: 'Baie/Bucatarie/Living..'}, {id: 1, value: 'Baie'}, {id : 2, value: 'Bucatarie'}, {id: 2, value: 'Living'}, {id: 4, value: 'Exterior'}];
        $scope.roomValues = [];
        $scope.nameValue = null;
        $scope.isPageReady = false;
        $scope.scrollPos = 0;

        $(window).on('scroll', function () {
            if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                $scope.scrollPos = $(window).scrollTop();
            }
        });

        var initializeGresie = function () {
            honeAndFaienceService.getHoneAndFaience($routeParams.collection).then(function (response) {
                $scope.cardsList = response.data;
                $timeout(function() { // wait for the dom to be loaded
                    $scope.isPageReady = true;
                });
            }, ajaxErrorCallback);
        };

        var cachedScope = cacheService.get('gresieCache');

        if (cachedScope == undefined) { // nothing in cache
            initializeGresie();
        } else {
            for (var key in cachedScope) {
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