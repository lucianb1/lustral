var honeAndFaienceModule = angular.module("honeAndFaienceModule", []);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

honeAndFaienceModule.service('honeAndFaienceService', ['$http', function ($http) {
    var createReuqestBody = function (name, sortValue, materialValues, designValues, roomValues, page) {
        var json = {};
        json.name = name;
        json.sort = sortValue;
        json.page = page;
        json.materialFilter = {};
        json.roomFilter = {};
        json.designFilter = {};

        angular.forEach(materialValues, function (material) {
            if (material != null) {
                json.materialFilter[material] = true;
            }
        });
        angular.forEach(roomValues, function (room) {
            if (room != null) {
                json.roomFilter[room] = true;
            }
        });
        angular.forEach(designValues, function (design) {
            if (design != null) {
                json.designFilter[design] = true;
            }
        });
        return json;
    };
    return {
        getGresie: function (name, sortValue, materialValues, designValues, roomValues, page) {
            return $http({
                url: '/gresie-faianta',
                data: createReuqestBody(name, sortValue, materialValues, designValues, roomValues, page),
                method: 'POST'
            })
                .error(ajaxErrorCallback);
        }
    }
}]);

honeAndFaienceModule.controller('honeAndFaienceController', ['$scope', '$routeParams', 'honeAndFaienceService', 'cacheService', '$timeout', '$q',
    function ($scope, $routeParams, gresieService, cacheService, $timeout, $q) {
        $scope.cardsList = [];
        $scope.sortValue = null;
        $scope.materialValues = [];
        $scope.designValues = [];
        $scope.roomValues = [];
        $scope.nameValue = null;
        $scope.listIsEmpty = false;
        $scope.canLoadNextPage = true;
        $scope.isPageReady = false;
        $scope.scrollPos = 0;
        $scope.currentPage = 1;
        this.time = null;
        var me = this;

        $(window).on('scroll', function () {
            if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                $scope.scrollPos = $(window).scrollTop();
            }
        });

        var getGresie = function () {
            return gresieService.getGresie($scope.nameValue, $scope.sortValue, $scope.materialValues, $scope.designValues, $scope.roomValues, $scope.currentPage);
        };

        $scope.initializeGresie = function (delay, delayOnCards) {
            // daca load parchet e programata sa execute functia din timeout atunci oprim executia functiei din timeout
            if (me.time) {
                clearTimeout(me.time);
            }
            if (delayOnCards == null) {
                delayOnCards = 200;
            }
            // salvez o noua referinta la urmatoru timeout ca sa ii pot da clear in caz ca mai dai click pe ceva in urmatoarele 2 secunde
            me.time = setTimeout(function () {
                $scope.isPageReady = false;
                $scope.currentPage = 1;
                $scope.cardsList = [];
                var getGresieFuture = getGresie();
                var timeoutFuture = $timeout(function () {
                }, delayOnCards);

                $q.all([timeoutFuture, getGresieFuture]).then(function(data) {
                    var response = data[1];
                    $scope.cardsList = response.data;
                    $scope.listIsEmpty = response.data.length == 0;
                    if (response.data.length == 30) { //TODO be aware
                        $scope.canLoadNextPage = true;
                    }
                    $scope.isPageReady = true;
                });

                me.time = null;

            }, delay);
        };

        var cachedScope = cacheService.get('gresieCache');

        if (cachedScope == undefined) { // nothing in cache
            $scope.initializeGresie(0, 0);
        } else {
            for (var key in cachedScope) {
                $scope[key] = cachedScope[key];
            }
        }

        $scope.nextPage = function () {
            if ($scope.canLoadNextPage) {
                $scope.canLoadNextPage = false;
                $scope.currentPage++;
                getGresie().then(function (response) {
                    var data = response.data;
                    if (data.length == 30) { //TODO be aware of this hardcoded - page size
                        $scope.canLoadNextPage = true;
                    }
                    $scope.cardsList = $scope.cardsList.concat(response.data);
                });
            }

        };

        var updateCache = function () {
            cacheService.put('gresieCache',
                {
                    'currentPage': $scope.currentPage,
                    'cardsList': $scope.cardsList,
                    'sortValue': $scope.sortValue,
                    'canLoadNextPage': $scope.canLoadNextPage,
                    'listIsEmpty': $scope.listIsEmpty,
                    'isPageReady': $scope.isPageReady,
                    'scrollPos': $scope.scrollPos,
                    'materialValues': $scope.materialValues,
                    'designValues': $scope.designValues,
                    'roomValues': $scope.roomValues,
                    'nameValue': $scope.nameValue
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


        $scope.updateFilter = function (timeout) {
            $scope.initializeGresie(timeout);
        };

        $scope.updateSort = function (timeout) {
            $scope.initializeGresie(timeout);
        };


    }
]);