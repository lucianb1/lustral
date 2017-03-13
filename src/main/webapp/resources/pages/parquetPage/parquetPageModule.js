var parquetModule = angular.module('parquetModule', []);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status
        + ' | message' + error.statusText);
};

// parquetModule.factory('parchetCache', ['$cacheFactory', function ($cacheFactory) {
//     return $cacheFactory('parchet', {'capacity': 1});
// }]);

parquetModule.service('parquetService', ['$http', function ($http) {
    var notNull = function (item) {
        return item != null;
    };

    var createJsonBody = function (sort, producers, widths, classes, page, code) {
        producers = producers.filter(notNull);
        widths = widths.filter(notNull);
        classes = classes.filter(notNull);

        return {
            'producers': producers,
            'sort': sort,
            'widths': widths,
            'classes': classes,
            'page': page,
            'name': code
        };

    };

    return {
        getParquet: function (sort, producers, widths, classes, page, code) {
            return $http({
                url: '/parchet',
                data: createJsonBody(sort, producers, widths, classes, page, code),
                method: 'POST'
            })
                .error(ajaxErrorCallback);
        }
    }
}]);

parquetModule.controller('parquetController', ['$scope', '$http',
    'parquetService', 'cacheService', '$timeout', '$q', function ($scope, $http, parquetService, cacheService, $timeout, $q) {
        $scope.sortValue = null;
        $scope.producerValues = [];
        $scope.codeValue = null;
        $scope.widthValues = [];
        $scope.classValues = [];
        $scope.cardsList = [];
        $scope.currentPage = 1;
        $scope.listIsEmpty = false;
        $scope.canLoadNextPage = true;
        $scope.isPageReady = false;
        $scope.scrollPos = 0;

        this.time = null;
        var me = this;

        $(window).on('scroll', function () {
            if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                $scope.scrollPos = $(window).scrollTop();
            }
        });



        var updateCache = function () {
            cacheService.put('parchetCache',
                {
                    'currentPage': $scope.currentPage,
                    'cardsList': $scope.cardsList, 'codeValue': $scope.codeValue,
                    'classValues': $scope.classValues,
                    'widthValues': $scope.widthValues,
                    'producerValues': $scope.producerValues,
                    'sortValue': $scope.sortValue,
                    'canLoadNextPage': $scope.canLoadNextPage,
                    'listIsEmpty': $scope.listIsEmpty,
                    'isPageReady': $scope.isPageReady,
                    'scrollPos': $scope.scrollPos
                });
        };

        var getParchet = function () {
            return parquetService.getParquet($scope.sortValue, $scope.producerValues, $scope.widthValues, $scope.classValues, $scope.currentPage, $scope.codeValue);
        };

        $scope.updateSort = function (timeout) {
            $scope.initializeParchet(timeout);
        };

        $scope.updateFilter = function (timeout) {
            $scope.initializeParchet(timeout);
        };

        // $scope.updateProducerFilter = function (timeout) {
            // var oldVInList = $scope.oldProducerValues[0] === null;
            // var newVInList = $scope.producerValues[0] === null;
            // if (oldVInList == newVInList) { // it was existing in the both, or not at all
            //     $scope.initializeParchet(timeout);
            // }
            // $scope.oldProducerValues = $scope.producerValues;
            // $scope.initializeParchet(timeout);
        // };



        $scope.nextPage = function () {
            if ($scope.canLoadNextPage) {
                $scope.canLoadNextPage = false;
                $scope.currentPage++;
                getParchet().then(function (response) {
                    var data = response.data;
                    if (data.length == 30) { //TODO be aware of this hardcoded - page size
                        $scope.canLoadNextPage = true;
                    }
                    $scope.cardsList = $scope.cardsList.concat(response.data);
                });
            }

        };

        $scope.initializeParchet = function (delay, delayOnCards) {
            // daca load parchet e programata sa execute functia din timeout atunci oprim executia functiei din timeout
            if (me.time) {
                clearTimeout(me.time);
            }
            // salvez o noua referinta la urmatoru timeout ca sa ii pot da clear in caz ca mai dai click pe ceva in urmatoarele 2 secunde
            me.time = setTimeout(function () {
                $scope.isPageReady = false;
                $scope.currentPage = 1;

                if (delayOnCards == null) {
                    delayOnCards = 200;
                }

                var getParchetFuture = getParchet();
                var timeoutFuture = $timeout(function () {
                }, delayOnCards);

                $q.all([timeoutFuture, getParchetFuture]).then(function(data) {
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
        var cachedScope = cacheService.get('parchetCache');

        if (cachedScope == undefined) { // nothing in cache
            $scope.initializeParchet(0, 0);
        } else {
            for (var key in cachedScope) {
                $scope[key] = cachedScope[key];
            }
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

// parquetModule.directive('openModal', function () {
//     return {
//         restrict: 'A', // E = element, A = attribute, C = class, M = comment
//         link: function ($scope, element, attr) {
//             if (attr.openParchetModal) {
//                 $scope[attr.openParchetModal] = function (data) {
//                     element.openModal();
//                 }
//             }
//         }
//     }
// });
